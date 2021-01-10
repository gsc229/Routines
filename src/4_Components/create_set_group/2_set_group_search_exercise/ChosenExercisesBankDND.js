import React from 'react'
import { connect } from 'react-redux'
import {removeChosenExercise, bulkWriteChosenExercises, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import BankCardDropZone from './BankCardDropZone'
import {DragDropContext} from 'react-beautiful-dnd'
import {onBankCardDragEnd} from './onBankCardDragEng'

export const ChosenExercisesBankDND = ({
  chosenExercises,
  bulkWriteChosenExercises
}) => {
  

  return (
    <DragDropContext
    onDragEnd={result => onBankCardDragEnd(result, bulkWriteChosenExercises, chosenExercises)}>
      <BankCardDropZone />   
    </DragDropContext>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises
})

const mapDispatchToProps = {
  bulkWriteChosenExercises
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenExercisesBankDND)




/* 

Old CODE: 

{chosenExercises.length > 0  && 
          <BankCardDropZone chosenExercises={chosenExercises} />
          }

 {chosenExercises.length > 0 && max === 1 &&
          <ul>
            {chosenExercises.map((exercise, index)=> 
            <li key={`chosen-exercise-bank-${exercise._id}-${index}`}>
              {exercise.name}&nbsp;
              <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
                <FiMinusSquare className='remove-icon' onClick={() => removeChosenExercise(exercise._id)} />
              </OverlayTrigger>
            </li>)}
          </ul>}
          {chosenExercises.length > 0 && min > 1 &&
          <ul>
            {chosenExercises.map((exercise, index)=> 
            <li key={`chosen-exercise-bank-${exercise._id}-${index}`}>
              <BankCard exercise={exercise} index={index} />
            </li>)}
          </ul>}











*/