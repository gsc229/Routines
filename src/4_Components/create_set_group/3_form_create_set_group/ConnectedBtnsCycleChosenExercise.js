import React from 'react'
import { connect } from 'react-redux'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'
import {Link, NavLink} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const NextExerciseBtn = ({
  localWritingCreateSetGroupData,
  currentExerciseSets,
  currentExerciseSetIndex,
  variant
}) => {

  const handleNextClick = () => {
    currentExerciseSetIndex < currentExerciseSets.length && localWritingCreateSetGroupData('currentExerciseSetIndex',currentExerciseSetIndex + 1)
  }

  return (
    <Nav.Link
    variant={variant}
    disabled={currentExerciseSetIndex === currentExerciseSets.length - 1}
    onClick={handleNextClick} 
    className='cycle-exercise-btn next-exercise-btn'>
      Next Exercise
    </Nav.Link>
  )
}

const PrevExerciseBtn = ({
  localWritingCreateSetGroupData,
  currentExerciseSets,
  currentExerciseSetIndex,
  variant
}) => {

  const handlePrevClick = () => {
    currentExerciseSets.length > 0 && localWritingCreateSetGroupData('currentExerciseSetIndex',currentExerciseSetIndex - 1)
  }

  return (
    <Nav.Link
    
    variant={variant}
    disabled={currentExerciseSetIndex === 0}
    onClick={handlePrevClick} 
    className='cycle-exercise-btn next-exercise-btn'>
      Previous Exercise
    </Nav.Link>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentExerciseSetIndex: state.setGroupReducer.createSetGroupData.currentExerciseSetIndex
})

const mapDispatchToProps = {
  localWritingCreateSetGroupData
}

export const ConnectedBtnNextExercise = connect(mapStateToProps, mapDispatchToProps)(NextExerciseBtn)
export const ConnectedBtnPrevExercise = connect(mapStateToProps, mapDispatchToProps)(PrevExerciseBtn)
