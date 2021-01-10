import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {removeChosenExercise, bulkWriteChosenExercises, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {canMoveToForm, minAndMaxAllowedExercises, getSetComboType} from '../createSetGroupHelpers'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {FiMinusSquare} from 'react-icons/fi'
import {FaRegHandPointRight} from 'react-icons/fa'
import BankCard from './BankCard'

export const ChosenExercisesBank = ({
  chosenExercises,
  currentSetGroup,
  removeChosenExercise,
  bulkWriteChosenExercises,
  writingCreateSetGroupData,
  createSetGroupData
}) => {
  

  
  
  const {set_group_type} = currentSetGroup
  const set_combo_type = getSetComboType()
  const {min, max} = minAndMaxAllowedExercises(set_group_type)
  const minMaxMessage = () => {

    const common = <>Exercises you choose for your <strong><i>{set_group_type} Set</i></strong> will be displayed here...</>

    if(min && !max){
      return <p className='no-exercises-message'>{common}<br/>{set_group_type} sets need a miniumum of {min} exercises</p>
    }
    if(min === max){
      return <p className='no-exercises-message'>{common}<br/>{set_group_type} sets need exactly {min} {min > 1 ? 'exercises' : 'exercise'}.</p>
    }

  }

  

  return (
    <Container 
    className='chosen-exercises-bank'>
      <div className='chosen-exerciese-bank-header'>
        <h4>Chosen Exercises:</h4>
        {canMoveToForm(set_group_type, createSetGroupData, chosenExercises) && 
        <p 
        onClick={() => writingCreateSetGroupData('currentStep', 'enter-info')}>
          Enter {set_group_type} Set Info <FaRegHandPointRight />
        </p>}
        
        
      </div>
      <div className='bank-body'>
        {!chosenExercises.length && 
          minMaxMessage()
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
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
  removeChosenExercise,
  writingCreateSetGroupData,
  bulkWriteChosenExercises
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenExercisesBank)
