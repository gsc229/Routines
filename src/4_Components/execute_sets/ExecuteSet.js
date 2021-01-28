import React from 'react'
import { connect } from 'react-redux'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import ExecuteSetNavs from './ExecuteSetNavs'

export const ExecuteSet = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet
}) => {


  return (
    <div className='execute-set'>
      <ExecuteSetNavs />
      <div className="execute-set-card">
        {currentExerciseSet.exercise.name|| 'No Name'}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  currentRoutine: state.routineReducer.currentRoutine,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  setCurrentExerciseSet,
  saveExerciseSetChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSet)
