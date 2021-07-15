import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveExerciseSetChanges, setCurrentExerciseSet, localWritingExerciseSet} from '../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'
import RecordSetList from './RecordSetList'

export const RecordInputs = ({
  currentExerciseSet,
  localWritingExerciseSet,
  saveExerciseSetChanges,
  setCurrentExerciseSet,
  userRoutines,
  targets, 
  targetsToActuals,
  routineColor,
  setSessionSaved,
  setUpdateSuccess
}) => {

  const [editingActual, setEditingActual] = useState(null) 
  const [originalActuals, setOriginalActuals] = useState([])

  useEffect(() => {
    setOriginalActuals(getOriginalActuals())
  }, [targets])

  const targetsEqualActuals = () => {
    for(let i = 0; i < targets.length; i++){
      if(targets[i].value !== currentExerciseSet[targets[i].field_name.replace('target', 'actual')]){
        return false
      }
    }
    return true
  }

  const getOriginalActuals = () => {
    const originals = []
    targets.forEach(target => {
      const actualObj = targetsToActuals[target.field_name]
      originals.push(actualObj)
    })
    return originals
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

  const handleCancel = () => {
    const revertedSet = {...currentExerciseSet}

    for(const actual of originalActuals){
      if(actual.value === 'not recorded') actual.value = null
      revertedSet[actual.field_name] = actual.value
    }

    setCurrentExerciseSet(revertedSet)
    setEditingActual(null)

  }

  /* const actualsComplete = () => {

    for(const target in targetsToActuals){
      if(targetsToActuals[target].value === 'not recorded'){
        return false
      }
    }
    return true
  } */

  const showActualsHaveChanged = () => {

    for(const actual of originalActuals){
      const currentSetActual = currentExerciseSet[actual.field_name] 
      console.log({currentSetActual, value: actual.value})
      if(actual.value !== currentSetActual){
        return true
      }
    }

    return false
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

        {/* <Button
        size='sm'
        //disabled={!showActualsHaveChanged()}
        onClick={handleCancel}
        variant='outline-danger'
        className='submit-all-btn'>
          Cancel
        </Button> */}

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
