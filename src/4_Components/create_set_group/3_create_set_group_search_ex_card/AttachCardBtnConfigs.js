import React from 'react'
import { connect } from 'react-redux'
import {addChosenExercise, removeChosenExercise, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {
  canAddThisExercise, 
  canMoveToForm, 
  canRemoveThisExercise, 
  canMoveToFormFromAnExerciseCard, 
  getRemainingExercises} from '../createSetGroupHelpers'
import {ConnectedNextStepBadge, ConnectedNextStepButton} from '../3_form_create_set_group/ConnectedBtnsNextAndPrevStep'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import {FiMinusSquare, FiPlus} from 'react-icons/fi'

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

  const exIsChosen = chosenExercises.find(ex => ex._id === exercise._id) 

  const addToText = exIsChosen ? 'Add Another' : `Use in ${set_group_type} Set`

  const handleRemoveClick = () => {
    removeChosenExercise(exercise._id)
  }

  const handleAddClick = () => {
    addChosenExercise(exercise)
  }

  const removeButton = () => {
    return canRemoveThisExercise(exercise, chosenExercises) && 
    <div className='card-link-container'>
      <Badge
      pill
      onClick={handleRemoveClick}
      className='card-link remove-from-set-link'
      >
        <FiMinusSquare />
        Remove from {set_group_type} Set
      </Badge>
    </div>
  }

  const addButton = () => {
    return canAddThisExercise(exercise, set_group_type, chosenExercises) && 
    <div className='card-link-container'>
      <Badge
      pill
      onClick={handleAddClick}
      className='card-link add-to-set-link'>
        <FiPlus />
        {addToText}
      </Badge>
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
        <ConnectedNextStepBadge
        pill={true} 
        text={nextStepText}
        writeDataKey='currentStep'
        writeDataValue={nextStep}
        />
    </div>
  } 


  return (
    <div className='add-remove-btn-config'>
      {shwoAddExerciseBtn && addButton()}
      {showRemoveExerciseBtn && removeButton()}
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
