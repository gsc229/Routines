import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveExerciseSetChanges, setCurrentExerciseSet} from '../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'
import NavLink from 'react-bootstrap/NavLink'
import RecordSetList from './RecordSetList'

export const RecordInputs = ({
  currentExerciseSet,
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

  const getOriginalActuals = () => {
    const originals = []
    targets.forEach(target => {
      const actualObj = targetsToActuals[target.field_name]
      originals.push(actualObj)
    })
    return originals
  }

  useEffect(() => {
     
    setOriginalActuals(getOriginalActuals())

  }, [targets])

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

  const actualsComplete = () => {

    for(const target in targetsToActuals){
      if(targetsToActuals[target].value === 'not recorded'){
        return false
      }
    }
    return true
  }

  const acutalsHaveChanged = () => {

    for(const actual of originalActuals){
      
      const currentSetActual = currentExerciseSet[actual.field_name] 

      if(actual.value !== currentSetActual){
        return true
      }
    }

    return false
  }

  return (

    <div
    className="revising-or-saved-container inputs-and-targets-revising-container">
        

          <div className='submit-and-cancel-btns'>
            <Button
            size='sm'
            disabled={!acutalsHaveChanged()}
            onClick={handleSubmit}
            variant={acutalsHaveChanged() ? 'outline-success' : 'outline-secondary' }
            className='submit-all-btn'>
              Submit
            </Button>
            <Button
            size='sm'
            disabled={!acutalsHaveChanged()}
            onClick={handleCancel}
            variant={acutalsHaveChanged() ? 'outline-primary' : 'outline-secondary' }
            className='submit-all-btn'>
              Cancel
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
  setCurrentExerciseSet
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordInputs)
