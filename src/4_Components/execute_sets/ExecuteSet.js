import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {isDev} from '../../config/config'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'

export const ExecuteSet = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet,
  saveExerciseSetChanges,
  setCurrentStep
}) => {

  useEffect(() => {
    setCurrentExerciseSet(currentExerciseSets.find(set => set.order === 0))
  }, [])

  return (
    <div className='e'>
      {currentExerciseSets.map(set => set.exercise.name)}
      {isDev && <div style={{color: 'white'}}><br></br><br></br>{JSON.stringify(currentExerciseSets, null, 2)}</div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  setCurrentExerciseSet,
  saveExerciseSetChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSet)
