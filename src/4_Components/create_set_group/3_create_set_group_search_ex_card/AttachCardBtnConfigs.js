import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  addToCurrentExerciseSets, 
  removeFromCurrentExerciseSetsByExerciseID,
  createNewExerciseSets,
  localBulkWriteExerciseSets,
  bulkWriteExerciseSets
} from '../../../1_Actions/exerciseSetActions'
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
  setShowAddedAlert,
  currentExerciseSet,
  currentExerciseSets,
  currentSetGroup,
  exercise,
  addToCurrentExerciseSets, 
  localBulkWriteExerciseSets,
  bulkWriteExerciseSets,
  removeFromCurrentExerciseSetsByExerciseID,
  createNewExerciseSets,
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

  const handleRemoveAllClick = async() => {
    if(currentSetGroup._id){

      const deleteCommands = []
      currentExerciseSets.forEach(set => set.exercise._id === exercise._id && 
        deleteCommands.push({
            deleteOne: {
              filter: {_id: set._id}
            }
        })
      ) 
      console.log({deleteCommands})
      const deleteResponse = await bulkWriteExerciseSets(deleteCommands, currentSetGroup._id)
      if(!deleteResponse.success){
        alert(`Something wend went wrong trying to delet: ${JSON.stringify(deleteCommands)}`)
      }
      
    }else{
      removeFromCurrentExerciseSetsByExerciseID(exercise._id)
    }
  }

  const handleAddClick = async() => {
    // if creating mode the whole set group and exercise sets are 
    // created at once through the CreateSetGroupBtn so just add them to bank without back end call
    const newExSet = {
      ...currentExerciseSet,
      set_group: currentSetGroup._id || null,
      routine,
      week,
      user,
      exercise,
      order: currentExerciseSets.length
    }
    
    if(currentSetGroup._id){
        console.log(exercise)
        
        addToCurrentExerciseSets(newExSet)
        const createResponse = await createNewExerciseSets([newExSet])
        if(!createResponse.success){
          localBulkWriteExerciseSets(currentExerciseSets)
          return
        }

        setShowAddedAlert(true)
        setTimeout(() => {setShowAddedAlert(false)}, 1000)

    } else{

      addToCurrentExerciseSets(newExSet)
      setShowAddedAlert(true)
      setTimeout(() => {setShowAddedAlert(false)}, 1000)

    }

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
      className='card-link remove-from-set-link'>
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
  localBulkWriteExerciseSets,
  bulkWriteExerciseSets,
  removeFromCurrentExerciseSetsByExerciseID,
  createNewExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveBtnConfigs)
