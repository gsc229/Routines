import React from 'react'
import { connect } from 'react-redux'
import {addChosenExercise, removeChosenExercise, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {FaRegHandPointRight} from 'react-icons/fa'
import {ConnectedNextStepButton} from '../form_create_set_group/SetGroupBtnsAndInputs'
import Button from 'react-bootstrap/Button'
import {FiMinusSquare} from 'react-icons/fi'

export const AddRemoveBtnConfigs = ({
  chosenExercises,
  currentSetGroup,
  exercise,
  addChosenExercise, 
  removeChosenExercise,
  writingCreateSetGroupData
}) => {

  const {set_group_type} = currentSetGroup

  const compoud_set_groups = ["Super", "Super - Antagonist", "Super - Compound", "Super - Tri", "Super - Giant", "Circuit"]

  const getSetGroupCategory = () => {
    return compoud_set_groups.find( type => type === set_group_type) ? "Compound" : "NonCompound"
  }

  const handleRemoveClick = () => {
    removeChosenExercise(exercise._id)
  }

  const handleAddClick = () => {
    addChosenExercise(exercise)
  }


  const showRemoveButton = {
    "NonCompound": function(){
      return chosenExercises.find(chosenEx => chosenEx._id === exercise._id)
    },
    "Compound": function () {
      return chosenExercises.find(chosenEx => chosenEx._id === exercise._id)
    } 
  }

  const showAddButton = {
    "NonCompound": function(){
      return !chosenExercises.find(chosenEx => chosenEx._id === exercise._id) && chosenExercises.length === 0
    },
    "Compound": function(){
      return !chosenExercises.find(chosenEx => chosenEx._id === exercise._id) && chosenExercises.length === 0
    }
  }

  const showPreviewSetGroupBtn = {
    "NonCompound": function(){
      return chosenExercises.find(chosenEx => chosenEx._id === exercise._id)
    },
    "Compound": function(){
      return chosenExercises.find(chosenEx => chosenEx._id === exercise._id)
    }
  }


  const removeButton = () => {
    return showRemoveButton[getSetGroupCategory()]() && 
    <div className='card-link-container'>
      <Button
      to='#'
      onClick={handleRemoveClick}
      className='card-link remove-from-set-link'
      >
        <FiMinusSquare />&nbsp;
        Remove from {set_group_type} Set
      </Button>
    </div>
  }

  const addButton = () => {
    return showAddButton[getSetGroupCategory()]() && 
    <div className='card-link-container'>
      <Button
      variant='success'
      onClick={handleAddClick}
      className='card-link add-to-set-link'>Use in {set_group_type} Set</Button>
    </div>
  }

  const previewSetGroupBtn = () => {
    return showPreviewSetGroupBtn[getSetGroupCategory()]() &&
    <div className='card-link-container'>
      <ConnectedNextStepButton 
      variant='success'
      text='Preview Set Group'
      writeDataKey='currentStep'
      writeDataValue='preview-set-group'
      />
    </div>
  } 


  return (
    <div>
      {removeButton()}
      {addButton()}
      {previewSetGroupBtn()}
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
