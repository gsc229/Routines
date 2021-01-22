import React, {useState, useEffect} from 'react'
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
  const [bankCardComputedStyles, setBankCardComputedStyles] = useState({})
  const [dropZones, setDropZones] = useState([])
  const [rowItems, setRowItems] = useState({})

  const [dndDimensions, setDndDimensions] = useState({
    dropZonesContainer: {},
    dropZone: {},
    bankCard: {width: 195},
    columns: 1,
    rows: 1
  })

  const bankCardElement = document.querySelector('.bank-card')
  const dropZonesContainerElement = document.querySelector('.drop-zones-container')
  console.log({bankCardElement, dropZonesContainerElement})
  
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
      columns = currentExerciseSets.length
      rows = 1
      vertical = true
    }

    const initialDropZones = []
    const initialRowItems = {}
    for(let i = 0; i < numRows; i++){
      const nextSlice = currentExerciseSets.slice(i * maxColumns, (i + 1) * maxColumns)
      initialRowItems[i] = nextSlice
      console.log({initialRowItems})
      const nextZoneContainerIndex = i * columns
      initialDropZones.push(
      <BankCardDropZone
      key={`dropzone-key-${i}`}
      direction={vertical ? 'vertical' : 'horizontal'}
      flexDirection={vertical ? 'column' : 'row'}
      droppableId={`bank-card-drop-zone-${i}`}
      zoneExSets={initialRowItems[i]} 
      zoneContainerIndex={nextZoneContainerIndex} />)
    }
      setRowItems(initialRowItems)
      setDropZones(initialDropZones)

  }, [dropZonesContainerElement])

  useEffect(() => {

  }, [])

  useEffect(() => {
    if(dndDimensions.rows !== 1){
      let {rows, columns} = dndDimensions
      let vertical = false
      if(rows === currentExerciseSets.length){
        columns = currentExerciseSets.length
        rows = 1
        vertical = true
      }
      const newDropZones = []
      for(let i = 0; i < rows; i ++){
        const nextZoneContainerIndex = i * columns
        newDropZones.push(
        <BankCardDropZone
        key={`dropzone-key-${i}`}
        direction={vertical ? 'vertical' : 'horizontal'}
        flexDirection={vertical ? 'column' : 'row'}
        droppableId={`bank-card-drop-zone-${i}`}
        zoneExSets={rowItems[i]} 
        zoneContainerIndex={nextZoneContainerIndex} />)
      }
      setDropZones(newDropZones)
    }
  }, [dndDimensions, currentExerciseSets])
  
  /* const handleDraggingUpdate = (dragUpdate) => {
    const {destination, source} = dragUpdate
    console.log({dragUpdate})
    
    if(source.droppableId !== destination.droppableId){
      const sourceRow =  JSON.parse(source.droppableId.split('-').pop())
      const destinationRow = JSON.parse(destination.droppableId.split('-').pop())
      console.log({destination, source, sourceRow, destinationRow})
      const copyItem = {...rowItems[sourceRow][source.index], order: destination.index}
      setRowItems({
        ...rowItems,
        [sourceRow]: [...rowItems[sourceRow].splice(source.index, 1)],
        [destinationRow]: [...rowItems[destinationRow].splice(destination.index, 0, )]
      })
    }
  } */
  
  return (
    <DragDropContext
    /* onDragUpdate={(dragUpdate) => dragUpdate.destination && handleDraggingUpdate(dragUpdate)} */
    onDragEnd={result => onBankCardDragEnd(result, localBulkWriteExerciseSets, currentExerciseSets, createSetGroupData.mode, bulkWriteExerciseSets)}>
      <div className='chosen-exerciese-bank-header'>
        <h4>Chosen Exercises:</h4>
        {isDev && 
        <DevComponent dndDimensions={dndDimensions} windowHeight={height} windowWidth={width} currentExerciseSets={currentExerciseSets} />}
      </div>
      <div 
      style={{display: 'flex', flexDirection: 'column'}}
      className='drop-zones-container'>
        {dropZones.length > 0 && dropZones.map(dropZone => dropZone)}
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




/* 

Old CODE: 

{currentExerciseSets.length > 0  && 
          <BankCardDropZone currentExerciseSets={currentExerciseSets} />
          }

 {currentExerciseSets.length > 0 && max === 1 &&
  <ul>
    {currentExerciseSets.map((exercise, index)=> 
    <li key={`chosen-exercise-bank-${exercise._id}-${index}`}>
      {exercise.name}&nbsp;
      <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
        <FiMinusSquare className='remove-icon' onClick={() =>  removeFromCurrentExerciseSetsByExerciseID(exercise._id)} />
      </OverlayTrigger>
    </li>)}
  </ul>}
  {currentExerciseSets.length > 0 && min > 1 &&
  <ul>
    {currentExerciseSets.map((exercise, index)=> 
    <li key={`chosen-exercise-bank-${exercise._id}-${index}`}>
      <BankCard exercise={exercise} index={index} />
    </li>)}
  </ul>}
*/