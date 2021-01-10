import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'
import {Link, NavLink} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const NextExerciseBtn = ({
  writingCreateSetGroupData,
  chosenExercises,
  chosenExerciseIndex,
  variant
}) => {

  const handleNextClick = () => {
    chosenExerciseIndex < chosenExercises.length && writingCreateSetGroupData('chosenExerciseIndex',chosenExerciseIndex + 1)
  }

  return (
    <Nav.Link
    variant={variant}
    disabled={chosenExerciseIndex === chosenExercises.length - 1}
    onClick={handleNextClick} 
    className='cycle-exercise-btn next-exercise-btn'>
      Next Exercise
    </Nav.Link>
  )
}

const PrevExerciseBtn = ({
  writingCreateSetGroupData,
  chosenExercises,
  chosenExerciseIndex,
  variant
}) => {

  const handlePrevClick = () => {
    chosenExercises.length > 0 && writingCreateSetGroupData('chosenExerciseIndex',chosenExerciseIndex - 1)
  }

  return (
    <Nav.Link
    
    variant={variant}
    disabled={chosenExerciseIndex === 0}
    onClick={handlePrevClick} 
    className='cycle-exercise-btn next-exercise-btn'>
      Previous Exercise
    </Nav.Link>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  chosenExerciseIndex: state.setGroupReducer.createSetGroupData.chosenExerciseIndex
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export const ConnectedBtnNextExercise = connect(mapStateToProps, mapDispatchToProps)(NextExerciseBtn)
export const ConnectedBtnPrevExercise = connect(mapStateToProps, mapDispatchToProps)(PrevExerciseBtn)
