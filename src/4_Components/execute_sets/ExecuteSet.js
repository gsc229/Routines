import React, {useState} from 'react'
import { connect } from 'react-redux'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import ExecuteSetNavs from './ExecuteSetNavs'
import ExerciseCard from '../../4_Components/exercise/card_exercise/ExerciseCard'
import Button from 'react-bootstrap/Button'

export const ExecuteSet = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet
}) => {

  const [instructionShow, setInstructionShow] = useState(false)
  

  return (
    <div className='execute-set'>
      <ExecuteSetNavs />
      <div className="execute-set-inner">
        <div className='inner-header'>
          <Button
            onClick={() => setInstructionShow(!instructionShow)}>{
            instructionShow ? 'Record Set' : 'See Instructions'}
          </Button>
        </div>
       {!instructionShow &&
        <div className="inputs-container">
          <h6>Inputs Container</h6>
        </div>}
      {instructionShow &&
      <div className='instruction-card-container'>
          <ExerciseCard showEditBtn={false} exercise={currentExerciseSet.exercise} />
      </div>}
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
