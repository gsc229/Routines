import React, { useState } from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {addToCurrentExerciseSets, removeFromCurrentExerciseSetsByExerciseID} from '../../../1_Actions/exerciseSetActions'
import {
  canAddThisExercise, 
  canMoveToForm, 
  canRemoveThisExercise, 
  canMoveToFormFromAnExerciseCard
} from '../createSetGroupHelpers'
import {ConnectedNextStepBadge, ConnectedNextStepButton} from '../3_form_create_set_group/ConnectedBtnsNextAndPrevStep'
import Badge from 'react-bootstrap/Badge'
import {FiMinusSquare, FiPlus} from 'react-icons/fi'
import RemoveAllModal from '../../modals/remove_modals/RemoveAllModal'



export const AddRemoveBtnConfigs = ({
  currentExerciseSet,
  currentExerciseSets,
  currentSetGroup,
  exercise,
  addToCurrentExerciseSets, 
  removeFromCurrentExerciseSetsByExerciseID,
  showNextStepBtn,
  showNextStepBtnOnCardBtn,
  showRemoveExerciseBtn,
  shwoAddExerciseBtn,
  nextStep,
  nextStepText
}) => {

  const [modalShow, setModalShow] = useState(false) 

  const {set_group_type, routine, week, user} = currentSetGroup

  const compoud_set_groups = ["Super", "Super - Antagonist", "Super - Compound", "Super - Tri", "Super - Giant", "Circuit"]

  const exIsChosen = currentExerciseSets.find(exSet => exSet.exercise._id === exercise._id) 

  const addToText = exIsChosen ? 'Add Another' : `Use in ${set_group_type} Set`

  const handleRemoveAllClick = () => {
    removeFromCurrentExerciseSetsByExerciseID(exercise._id)
  }

  const handleAddClick = () => {
    const newExSet = {
      ...currentExerciseSet,
      routine,
      week,
      user,
      exercise

    }

    addToCurrentExerciseSets(newExSet)
  }

  

  const removeAllModal = () => {
    const modalBodyHtml = <div>Are you sure you want to remove all sets of {exercise.name} from this set group?</div>
    return(
      <RemoveAllModal 
      modalShow={modalShow} 
      setModalShow={setModalShow} 
      handleRemoveAllClick={handleRemoveAllClick}
      bodyInnerHtml={modalBodyHtml}
      resource={exercise}/>
    )
  }

  const removeAllButton = () => {
    return canRemoveThisExercise(exercise, currentExerciseSets) && 
    <div className='card-link-container'>
      <Badge
      pill
      onClick={() => setModalShow(true) }
      className='card-link remove-from-set-link'
      >
        <FiMinusSquare />&nbsp;REMOVE ALL
      </Badge>
    </div>
  }

  const addButton = () => {
    return canAddThisExercise(exercise, set_group_type, currentExerciseSets) && 
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
    return canMoveToForm(set_group_type, currentExerciseSets) &&
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
    return canMoveToFormFromAnExerciseCard(exercise, set_group_type, currentExerciseSets)  &&
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
      {modalShow && removeAllModal()}
      {shwoAddExerciseBtn && addButton()}
      {showRemoveExerciseBtn && removeAllButton()}
      {showNextStepBtnOnCardBtn && nextStepOnCardBtn()}
      {showNextStepBtn && nextStepBtn()}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  addToCurrentExerciseSets,
  removeFromCurrentExerciseSetsByExerciseID,
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveBtnConfigs)
