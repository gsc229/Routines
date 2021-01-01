import React from 'react'
import { connect } from 'react-redux'
import {addChosenExercise, removeChosenExercise, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {FaRegHandPointRight} from 'react-icons/fa'
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

  const handleRemoveClick = {
    "Drop": function(){
      removeChosenExercise(exercise._id)
    }

  }

  const handleAddClick = {
    "Drop": function(){
      addChosenExercise(exercise)
    }
  }


  const showRemoveButton = {
    "Drop": function(){
      return chosenExercises.find(inChosen => inChosen._id === exercise._id)
    }
  }

  const showAddButton = {
    "Drop": function(){
      return !chosenExercises.find(inChosen => inChosen._id === exercise._id) && chosenExercises.length === 0
    }
  }

  const showPreviewSetGroiupBtn = {
    "Drop": function(){
      return chosenExercises.find(inChosen => inChosen._id === exercise._id)
    }
  }


  const removeButton = () => {
    return showRemoveButton[set_group_type]() && 
    <div className='card-link-container'>
      <Button
      to='#'
      onClick={() => handleRemoveClick[set_group_type]()}
      className='card-link remove-from-set-link'
      >
        <FiMinusSquare />&nbsp;
        Remove from {set_group_type} Set
      </Button>
    </div>
  }

  const addButton = () => {
    return showAddButton[set_group_type]() && 
    <div className='card-link-container'>
      <Button
      variant='success'
      onClick={() => handleAddClick[set_group_type]()}
      className='card-link add-to-set-link'>Use in {set_group_type} Set</Button>
    </div>
  }

  const previewSetGroiupBtn = () => {
    return showPreviewSetGroiupBtn[set_group_type]() &&
    <div className='card-link-container'>
      <Button
      variant='success'
      to='#'
      onClick={() => writingCreateSetGroupData('currentStep', 'preview-set-group')}
      className='card-link preview-set-link'>
        Preview Set Group&nbsp;
        <FaRegHandPointRight />
      </Button>
    </div>
  } 


  return (
    <div>
      {removeButton()}
      {addButton()}
      {previewSetGroiupBtn()}
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
