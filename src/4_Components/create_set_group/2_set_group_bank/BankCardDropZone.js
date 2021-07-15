import React from 'react'
import { connect } from 'react-redux'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import { removeFromCurrentExerciseSetsByExerciseID, localBulkWriteExerciseSets} from '../../../1_Actions/exerciseSetActions'
import {Droppable} from 'react-beautiful-dnd'
import BankCardDraggable from './BankCardDraggable'


const BankCardDropZone = ({
  droppableId='bank-card-drop-zone',
  direction='horizontal',
  zoneContainerIndex,
  zoneExSets,
  flexDirection
}) => {

  //const {set_group_type} = currentSetGroup
  //const {min, max} = minAndMaxAllowedExercises(set_group_type)

 /*  const minMaxMessage = () => {

    const common = <>Exercises you choose for your <strong><i>{set_group_type} Set</i></strong> will be displayed here...</>

    if(min && !max){
      return <p className='no-exercises-message'>{common}<br/>{set_group_type} sets need a miniumum of {min} exercises</p>
    }
    if(min === max){
      return <p className='no-exercises-message'>{common}<br/>{set_group_type} sets need exactly {min} {min > 1 ? 'exercises' : 'exercise'}.</p>
    }

  } */

  return (
    <Droppable
    direction={direction}
    key={droppableId}
    droppableId={droppableId}>

    {(provided, snapshopt) => {
      
      return(
        <div
        className={`chosen-exercises-bank ${snapshopt.isDraggingOver && 'exercise-bank-dragover'}`}>          
          <div 
          {...provided.droppableProps}
          id={droppableId}
          className='drop-zone-row'
          style={{flexDirection}}
          ref={provided.innerRef}>
            {zoneExSets.map((exerciseSet, index) => {
              return (
              <BankCardDraggable
              key={`bankCardDraggable-${index + zoneContainerIndex}`} 
              exerciseSet={exerciseSet} 
              index={index + zoneContainerIndex}  />)
            })}
          {provided.placeholder}
          </div>
      </div>
      
      )}}
      
     </Droppable>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
   removeFromCurrentExerciseSetsByExerciseID,
  localWritingCreateSetGroupData,
  localBulkWriteExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCardDropZone)


