import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'

export const NextExerciseBtn = ({
  writingCreateSetGroupData,
  chosenExercises,
  chosenExerciseIndex
}) => {
  return (
    <Button 
    className='cycle-exercise-btn next-exercise-btn'>
      Next Exercise
    </Button>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  chosenExerciseIndex: state.setGroupReducer.createSetGroupData.chosenExerciseIndex
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export const ConnectedNextExerciseBtn = connect(mapStateToProps, mapDispatchToProps)(NextExerciseBtn)
