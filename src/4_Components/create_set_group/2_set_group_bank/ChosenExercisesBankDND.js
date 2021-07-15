import React, { useState, useEffect } from 'react'
import {useWindowSize} from '../../../custom_hooks/useWindowSize'
import { connect } from 'react-redux'
import {localBulkWriteExerciseSets, bulkWriteExerciseSets} from '../../../1_Actions/exerciseSetActions'
import BankCardDropZone from './BankCardDropZone'
import {DragDropContext} from 'react-beautiful-dnd'
import {onBankCardDragEnd} from './onBankCardDragEng'

export const ChosenExercisesBankDND = ({
  currentExerciseSets,
  localBulkWriteExerciseSets,
  createSetGroupData,
  bulkWriteExerciseSets
}) => {
  
  const { width } = useWindowSize()
  const [dropZoneSets, setDropZoneSets] = useState([])

  const [dndDimensions, setDndDimensions] = useState({
    dropZonesContainer: {},
    dropZone: {},
    bankCard: {width: 195},
    columns: 1,
    rows: 1,
    vertical: false
  })

  const bankCardElement = document.querySelector('.bank-card')
  const dropZonesContainerElement = document.querySelector('.drop-zones-container')
  
  const dropZonesContainerWidth = dropZonesContainerElement ? JSON.parse(Math.floor(getComputedStyle(dropZonesContainerElement).width.replace(/[px]/g, ''))) : 1200
  const bankCardWidth = bankCardElement ? JSON.parse(Math.floor(getComputedStyle(bankCardElement).width.replace(/[px]/g, ''))) + 20  : 195// + 20 for 10px padding on .drop-zone-row
  //dndDimensions.columns are initialized a 1 to allow a dropZone element to be rendered to the screen which are used in determing the number of columns
  const maxColumns =  Math.floor(dropZonesContainerWidth / bankCardWidth) 
  const numRows = Math.ceil(currentExerciseSets.length / maxColumns)
  
  useEffect(() => {
      setDndDimensions((dimensions) => ({
        ...dimensions,
        dropZonesContainer: {
          width: dropZonesContainerWidth
        },
        bankCard: {
          width: bankCardWidth
        },
        columns: maxColumns,
        rows: numRows
      }))
      // initialize the drop zones with the max number of columns according to dropZoneContainerWidth and
      // fill them to the maxColumns number moving remainters to the next column
      let initialRowItems = {}
      let initialDropZoneSets = []

      if(maxColumns === 1){
        initialRowItems[0] = currentExerciseSets.sort((a, b) => a.order - b.order)
        initialDropZoneSets = currentExerciseSets
        setDndDimensions((dimensions) => ({
          ...dimensions,
          columns: 1,
          rows: 1,
          vertical: true
        }))
      } else{
      
        for(let i = 0; i < numRows; i++){
          const nextSlice = currentExerciseSets.sort((a, b) => a.order - b.order).slice(i * maxColumns, (i + 1) * maxColumns)
          initialRowItems[i] = nextSlice
          initialDropZoneSets.push(nextSlice)
        }

        setDndDimensions((dimensions) => ({
          ...dimensions,
          dropZonesContainer: {
            width: dropZonesContainerWidth
          },
          bankCard: {
            width: bankCardWidth
          },
          columns: maxColumns,
          rows: numRows,
          vertical: false
        }))

      }
      setDropZoneSets(initialDropZoneSets)
    

  }, [dropZonesContainerElement, bankCardElement, currentExerciseSets, width, bankCardWidth, dropZonesContainerWidth, maxColumns, numRows])

  
  
  return (
    <DragDropContext
    onDragEnd={result => onBankCardDragEnd(result, localBulkWriteExerciseSets, currentExerciseSets, createSetGroupData.mode, bulkWriteExerciseSets)}>
      <div className='chosen-exerciese-bank-header'>
        <h4>Chosen Exercises:</h4>
        {/* {isDev && 
        <DevComponent maxColumns={maxColumns} dndDimensions={dndDimensions} windowHeight={height} windowWidth={width} dropZoneSets={dropZoneSets} currentExerciseSets={currentExerciseSets} />} */}
      </div>
      <div 
      style={{display: 'flex', flexDirection: 'column'}}
      className='drop-zones-container'>
        {/* Initial 'dummy' render */}
        {dropZoneSets.length === 0 && 
        <BankCardDropZone 
        key={`dropzone-initial-key-0`}
        direction='horizontal'
        droppableId={`bank-card-initial-zone-0`}
        zoneExSets={[currentExerciseSets[0]]}
        zoneContainerIndex={0}/>}
        
        {dropZoneSets.length > 0 && !dndDimensions.vertical && dropZoneSets.map((sets, idx )=> {
          const {vertical, columns} = dndDimensions
          const nextZoneContainerIndex = idx * columns
          return(
            <BankCardDropZone
            key={`dropzone-key-${idx}`}
            direction={vertical ? 'vertical' : 'horizontal'}
            flexDirection={vertical ? 'column' : 'row'}
            droppableId={`bank-card-drop-zone-${idx}`}
            zoneExSets={sets} 
            zoneContainerIndex={nextZoneContainerIndex} />
          )
        })}

        {dropZoneSets.length === currentExerciseSets.length && dndDimensions.vertical && 
          <BankCardDropZone
          key={`dropzone-key-${0}`}
          direction={dndDimensions.vertical ? 'vertical' : 'horizontal'}
          flexDirection={dndDimensions.vertical ? 'column' : 'row'}
          droppableId={`bank-card-drop-zone-${0}`}
          zoneExSets={currentExerciseSets} 
          zoneContainerIndex={0} />}
          
    
      </div>
    </DragDropContext>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
  localBulkWriteExerciseSets,
  bulkWriteExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenExercisesBankDND)