import React from 'react'
import { connect } from 'react-redux'
import {addChosenExercise, removeChosenExercise} from '../../../1_Actions/setGroupActions'
import {Link} from 'react-router-dom'

export const AddRemoveBtnConfigs = ({
  chosenExercises,
  createSetGroupData,
  currentSetGroup,
  exercise,
  addChosenExercise, 
  removeChosenExercise
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


  const removeButton = () => {
    return showRemoveButton[set_group_type]() && 
    <div className='card-link-container'>
      <Link
      to='#'
      onClick={() => handleRemoveClick[set_group_type]()}
      className='card-link remove-from-set-link'
      >Remove from {set_group_type} Set</Link>
    </div>
  }

  const addButton = () => {
    return showAddButton[set_group_type]() && 
    <div className='card-link-container'>
      <Link
      to='#'
      onClick={() => handleAddClick[set_group_type]()}
      className='card-link add-to-set-link'>Use in this {set_group_type} Set</Link>
    </div>
  }


  return (
    <div>
      {removeButton()}
      {addButton()}
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
  removeChosenExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveBtnConfigs)
