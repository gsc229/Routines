import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {useParams} from 'react-router-dom'
import {successGifLinks} from '../../utils/randomGifs'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {getExSetActiveFields} from '../../utils/getExSetActiveFields'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import ExecuteSetNavs from './ExecuteSetNavs'
import ExerciseCard from '../../4_Components/exercise/card_exercise/ExerciseCard'
import Button from 'react-bootstrap/Button'
import RecordSetInput from './RecordSetInput'
import {EyeIcon, PointLeftIcon} from '../icons/Icons'

export const ExecuteSet = ({
  currentExerciseSet,
  saveExerciseSetChanges
}) => {
  
  const {width} = useWindowSize()
  const [instructionShow, setInstructionShow] = useState(false)
  const [targets, setTargets]  = useState([])
  const [targetsToActuals, setTargetsToActuals] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  
  
  useEffect(() => {
    const activeFields = getExSetActiveFields(currentExerciseSet)
    setTargets(activeFields.activeTargets)
    setTargetsToActuals(activeFields.targetToActuals)
  }, [currentExerciseSet])

  const handleSubmit = async() => {
    const updateResult = await saveExerciseSetChanges(currentExerciseSet._id, currentExerciseSet)
    if(updateResult.success){
      setUpdateSuccess(true)
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    }
  }

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

       {!instructionShow && !updateSuccess &&
        <div className="inputs-and-targets-container">
          <div className='inputs-container'>
          {targets.map(target => 
              <div 
              key={target.field_name}
              className='target-container'>
                <RecordSetInput 
                field={targetsToActuals[target.field_name].field_name}
                labelText={`${target.name}: ${target.value}`} />
              </div>  
            )}
          </div>
          <Button
          onClick={handleSubmit}
          variant='success'
          className='submit-btn'>Submit</Button>
        </div>}

        {!instructionShow && updateSuccess && 
        <div 
        style={{display: 'flex'}}
        className='update-success-container'>
          <img
          style={{margin: 'auto', maxWidth: `${width - 50}px`}}
          src={successGifLinks[Math.floor(Math.random() * successGifLinks.length)]}></img>
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
