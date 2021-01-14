import React from 'react'
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
  

  return (
    <DragDropContext
    onDragEnd={result => onBankCardDragEnd(result, localBulkWriteExerciseSets, currentExerciseSets, createSetGroupData.mode, bulkWriteExerciseSets)}>
      <BankCardDropZone />   
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
                <FiMinusSquare className='remove-icon' onClick={() => removeFromCurrentExerciseSetsByExerciseID(exercise._id)} />
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