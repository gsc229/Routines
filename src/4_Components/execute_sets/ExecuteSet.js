import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {getExSetActiveFields} from '../../utils/getExSetActiveFields'
import ExecuteSetNavs from './ExecuteSetNavs'
import ExerciseCard from '../../4_Components/exercise/card_exercise/ExerciseCard'
import Button from 'react-bootstrap/Button'
import RecordSetInput from './RecordSetInput'
import {EyeIcon, PointLeftIcon} from '../icons/Icons'

export const ExecuteSet = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet
}) => {

  const [instructionShow, setInstructionShow] = useState(false)
  const [targets, setTargets]  = useState([])
  const [targetsToActuals, setTargetsToActuals] = useState({})
  
  useEffect(() => {
    const activeFields = getExSetActiveFields(currentExerciseSet)
    console.log({activeFields})
    setTargets(activeFields.activeTargets)
    setTargetsToActuals(activeFields.targetToActuals)
  }, [currentExerciseSet])

  return (
    <div className='execute-set'>
      <ExecuteSetNavs />
      <div className="execute-set-inner">
        <div className='inner-header'>
          <Button
            variant={instructionShow ? 'success' : 'primary'}
            onClick={() => setInstructionShow(!instructionShow)}>{
            instructionShow ? 
            <div 
            className='btn-text-container'>
              <PointLeftIcon />&nbsp; Back to record
            </div>
            : 
            <div 
            className='btn-text-container'>
              <EyeIcon />&nbsp; Instructions
            </div>}
          </Button>
        </div>

       {!instructionShow &&
        <div className="inputs-and-targets-container">
          <div className='inputs-container'>
          {targets.map(target => 
              <div className='target-container'>
                <RecordSetInput 
                field={targetsToActuals[target.field_name].field_name}
                labelText={`${target.name}: ${target.value}`} />
              </div>  
            )}
          </div>
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
