import React from 'react'
import { connect } from 'react-redux'
import {addChosenExercise, removeChosenExercise, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {
  canAddThisExercise, 
  canMoveToForm, 
  canRemoveThisExercise, 
  canMoveToFormFromAnExerciseCard, 
  getRemainingExercises} from '../createSetGroupHelpers'
import {ConnectedNextStepButton} from '../3_form_create_set_group/ConnectedPrependInputs'
import Button from 'react-bootstrap/Button'
import {FiMinusSquare} from 'react-icons/fi'

export const AddRemoveBtnConfigs = ({
  chosenExercises,
  currentSetGroup,
  exercise,
  addChosenExercise, 
  removeChosenExercise,
  showNextStepBtn,
  showNextStepBtnOnCardBtn,
  showRemoveExerciseBtn,
  shwoAddExerciseBtn,
  nextStep,
  nextStepText
}) => {

  const {set_group_type} = currentSetGroup

  const compoud_set_groups = ["Super", "Super - Antagonist", "Super - Compound", "Super - Tri", "Super - Giant", "Circuit"]


  const handleRemoveClick = () => {
    removeChosenExercise(exercise._id)
  }

  const handleAddClick = () => {
    addChosenExercise(exercise)
  }

  const removeButton = () => {
    return canRemoveThisExercise(exercise, chosenExercises) && 
    <div className='card-link-container'>
      <Button
      onClick={handleRemoveClick}
      className='card-link remove-from-set-link'
      >
        <FiMinusSquare />&nbsp;
        Remove from {set_group_type} Set
      </Button>
    </div>
  }

  const addButton = () => {
    return canAddThisExercise(exercise, set_group_type, chosenExercises) && 
    <div className='card-link-container'>
      <Button
      variant='success'
      onClick={handleAddClick}
      className='card-link add-to-set-link'>Use in {set_group_type} Set</Button>
    </div>
  }

  const nextStepBtn = () => {
    return canMoveToForm(set_group_type, chosenExercises) &&
    <div className='card-link-container'>
      <ConnectedNextStepButton 
      variant='success'
      text={nextStepText}
      writeDataKey='currentStep'
      writeDataValue={nextStep}
      />
    </div>
  } 

  const nextStepOnCardBtn = () => {
    return canMoveToFormFromAnExerciseCard(exercise, set_group_type, chosenExercises)  &&
    <div className='card-link-container'>
      <ConnectedNextStepButton 
      variant='success'
      text={nextStepText}
      writeDataKey='currentStep'
      writeDataValue={nextStep}
      />
    </div>
  } 


  return (
    <div>
      {showRemoveExerciseBtn && removeButton()}
      {shwoAddExerciseBtn && addButton()}
      {showNextStepBtnOnCardBtn && nextStepOnCardBtn()}
      {showNextStepBtn && nextStepBtn()}
    </div>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  addChosenExercise,
  removeChosenExercise,
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveBtnConfigs)
