import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {successGifLinks} from '../../utils/randomGifs'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {getExSetActiveFields} from '../../utils/getExSetActiveFields'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import ExecuteSetNavs from './ExecuteSetNavs'
import ExerciseCard from '../../4_Components/exercise/card_exercise/ExerciseCard'
import Button from 'react-bootstrap/Button'
import {EyeIcon, PointLeftIcon} from '../icons/Icons'
import RecordInputs from './RecordInputs'
import NavLink from 'react-bootstrap/NavLink'

export const ExecuteSet = ({
  currentExerciseSet,
  routineNamesColors
}) => {

  const routineColor = routineNamesColors[currentExerciseSet.routine].color
  const {width} = useWindowSize()
  const [instructionShow, setInstructionShow] = useState(false)
  const [targets, setTargets]  = useState([])
  const [targetsToActuals, setTargetsToActuals] = useState({})
  const [editingMode, setEditingMode] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [sessionSaved, setSessionSaved] = useState(false)
  
  useEffect(() => {

    const activeFields = getExSetActiveFields(currentExerciseSet)
    setTargets(activeFields.activeTargets)
    setTargetsToActuals(activeFields.targetToActuals)
    setSessionSaved(false)
  }, [currentExerciseSet])

  


  return (
    <div className='execute-set'>
      <ExecuteSetNavs />
      <div className="execute-set-inner">

        {!sessionSaved && 
        
        <div className='instruction-btn-container'>

          <Button
            size='sm'
            block
            variant={instructionShow ? 'outline-success' : 'outline-info'}
            onClick={() => setInstructionShow(!instructionShow)}>
            {
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

        </div>}

       {!instructionShow && !updateSuccess && !sessionSaved &&
       <RecordInputs
       setSessionSaved={setSessionSaved}
       setUpdateSuccess={setUpdateSuccess}
       routineColor={routineColor}
       targets={targets} 
       targetsToActuals={targetsToActuals} />}

      {sessionSaved && !instructionShow && !updateSuccess &&
      <div className="revising-or-saved-container inputs-and-targets-saved-container">
        <ul className='list targets-and-actuals-list'>

          {targets.map(target =>{ 
            const actualName = targetsToActuals[target.field_name].name
            const actualValue = 
            targetsToActuals[target.field_name].value === 'not recorded'
            ? <span className='not-recorded-span'>{targetsToActuals[target.field_name].value }</span>
            : targetsToActuals[target.field_name].value 

            return(
              <li
              key={target.field_name}
              style={{border: `1px dotted ${routineColor ? routineColor : 'var(--routine-red)'}`}} 
              className='list-item target-and-result'>
                <div 
                className='target-container'>
                  {target.name}: {target.value}
                </div>  
                <div 
                
                className='result-container'>
                  {actualName}: {actualValue}
                </div> 
              </li>
            )
          })}

        </ul>

        <div className='revise-btn-and-success-messge'>
          <p>Your set has been submitted!</p>
          <Button
          onClick={() => setSessionSaved(false)}
          variant='outline-warning'
          className='revise-btn'>
            Revise
          </Button>
        </div>
          
      </div>} 


      {!instructionShow && updateSuccess && !sessionSaved &&
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
  userRoutines: state.routineReducer.userRoutines,
  routineNamesColors: state.routineReducer.routineNamesColors
})

const mapDispatchToProps = {
  setCurrentExerciseSet
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSet)
