import React, { useState } from 'react'
import { connect } from 'react-redux'
import {saveExerciseSetChanges, setCurrentExerciseSet, localWritingExerciseSet} from '../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'
import RecordSetList from './RecordSetList'

export const RecordInputs = ({
  currentExerciseSet,
  localWritingExerciseSet,
  saveExerciseSetChanges,
  userRoutines,
  targets, 
  targetsToActuals,
  routineColor,
  setSessionSaved,
  setUpdateSuccess
}) => {

  const [editingActual, setEditingActual] = useState(null) 

  

  const targetsEqualActuals = () => {
    for(let i = 0; i < targets.length; i++){
      if(targets[i].value !== currentExerciseSet[targets[i].field_name.replace('target', 'actual')]){
        return false
      }
    }
    return true
  }


  const handleSubmit = async() => {
    const updateResult = await saveExerciseSetChanges(currentExerciseSet._id, currentExerciseSet)
    if(updateResult.success){
      setUpdateSuccess(true)
      setTimeout(() => {
        setUpdateSuccess(false)
        setSessionSaved(true)
      }, 3000)
    }

  }

  

 const handleAutoFill = () => {
   targets.forEach(target => {
     localWritingExerciseSet(target.field_name.replace('target', 'actual'), target.value)
   })
 }

  return (

    <div
    className="revising-or-saved-container inputs-and-targets-revising-container">
          
      <div className='submit-and-cancel-btns'>
        
        <Button
        size='sm'
        disabled={targets.length < 1 || targetsEqualActuals()}
        onClick={handleAutoFill}
        variant='danger'
        className='submit-all-btn'>
          {`Match Target${targets.length > 1 ? 's' : ''}`}
        </Button>

        <Button
        size='sm'
        
        onClick={handleSubmit}
        variant='outline-success'
        className='submit-all-btn'>
          Submit
        </Button>

      </div>
    
      
      <RecordSetList
      userRoutines={userRoutines}
      targets={targets}
      targetsToActuals={targetsToActuals}
      currentExerciseSet={currentExerciseSet}
      setEditingActual={setEditingActual} 
      editingActual={editingActual}
      routineColor={routineColor}/>
        
        
  </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  saveExerciseSetChanges,
  setCurrentExerciseSet,
  localWritingExerciseSet
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordInputs)
