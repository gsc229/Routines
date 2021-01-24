import React, {useState, useEffect, useLayoutEffect} from 'react'
import {useWindowSize} from '../../../custom_hooks/useWindowSize'
import {isDev} from '../../../config/config'
import { connect } from 'react-redux'
import {localBulkWriteExerciseSets, bulkWriteExerciseSets} from '../../../1_Actions/exerciseSetActions'
import BankCardDropZone from './BankCardDropZone'
import {DragDropContext} from 'react-beautiful-dnd'
import {onBankCardDragEnd} from './onBankCardDragEng'
import DevComponent from './DevComponent'

export const ChosenExercisesBankDND = ({
  currentExerciseSets,
  localBulkWriteExerciseSets,
  createSetGroupData,
  bulkWriteExerciseSets
}) => {
  
  const {height, width} = useWindowSize()
  const [dropZoneSets, setDropZoneSets] = useState([])
  const [dropZones, setDropZones] = useState([])

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
      setDndDimensions({
        dropZonesContainer: {
          width: dropZonesContainerWidth
        },
        bankCard: {
          width: bankCardWidth
        },
        columns: maxColumns,
        rows: numRows
      })
      // initialize the drop zones with the max number of columns according to dropZoneContainerWidth and
      // fill them to the maxColumns number moving remainters to the next column
      let {rows, columns} = dndDimensions
      let vertical = false
      if(rows === currentExerciseSets.length){
        setDndDimensions({
          ...dndDimensions,
          columns: currentExerciseSets.length,
          rows: 1,
          vertical: true
        })
      }
  
      const initialDropZones = []
      const initialRowItems = {}
      const initialDropZoneSets = []
      
      for(let i = 0; i < numRows; i++){
        const nextSlice = currentExerciseSets.sort((a, b) => a.order - b.order).slice(i * maxColumns, (i + 1) * maxColumns)
        initialRowItems[i] = nextSlice
        initialDropZoneSets.push(nextSlice)
        const nextZoneContainerIndex = i * columns
        /* initialDropZones.push(
        <BankCardDropZone
        key={`dropzone-key-${i}`}
        direction={vertical ? 'vertical' : 'horizontal'}
        flexDirection={vertical ? 'column' : 'row'}
        droppableId={`bank-card-drop-zone-${i}`}
        zoneExSets={nextSlice} 
        zoneContainerIndex={nextZoneContainerIndex} />) */
      }
        setDropZoneSets(initialDropZoneSets)
        setDropZones(initialDropZones)
    

  }, [dropZonesContainerElement, bankCardElement, currentExerciseSets, width])


  /* useEffect(() => {
    let {rows, columns} = dndDimensions
    let vertical = false
    if(rows === currentExerciseSets.length){
      columns = currentExerciseSets.length
      rows = 1
      vertical = true
    }

    const newDropZones = []
    for(let i = 0; i < numRows; i++){
      const nextSlice = currentExerciseSets.slice(i * maxColumns, (i + 1) * maxColumns)
      const nextZoneContainerIndex = i * columns
      newDropZones.push(
      <BankCardDropZone
      key={`dropzone-key-${i}`}
      direction={vertical ? 'vertical' : 'horizontal'}
      flexDirection={vertical ? 'column' : 'row'}
      droppableId={`bank-card-drop-zone-${i}`}
      zoneExSets={nextSlice} 
      zoneContainerIndex={nextZoneContainerIndex} />)
    }
    setDropZones(newDropZones)
  }, [dndDimensions, currentExerciseSets]) */
  
  
  return (
    <DragDropContext
    onDragEnd={result => onBankCardDragEnd(result, localBulkWriteExerciseSets, currentExerciseSets, createSetGroupData.mode, bulkWriteExerciseSets)}>
      <div className='chosen-exerciese-bank-header'>
        <h4>Chosen Exercises:</h4>
        {isDev && 
        <DevComponent dndDimensions={dndDimensions} windowHeight={height} windowWidth={width} currentExerciseSets={currentExerciseSets} />}
      </div>
      <div 
      style={{display: 'flex', flexDirection: 'column'}}
      className='drop-zones-container'>
        {dropZoneSets.length > 0 && dropZoneSets.map((sets, idx )=> {
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