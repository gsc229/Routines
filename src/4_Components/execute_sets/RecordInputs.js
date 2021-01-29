import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import RecordSetInput from './RecordSetInput'
import Button from 'react-bootstrap/Button'

export const RecordInputs = ({
  currentExerciseSet,
  saveExerciseSetChanges,
  targets, 
  targetsToActuals,
  routineColor,
  setSessionSaved,
  setUpdateSuccess
}) => {


  const [editingActual, setEditingActual] = useState(null) 
  const [originalActuals, setOriginalActuals] = useState([])

  useEffect(() => {
    
    const initialTargetStates = {}
    const originals = []
    setOriginalActuals(originals)
  }, [currentExerciseSet._id])

  
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
    
      if(actual.value !== currentExerciseSet[actual.field_name]){
        return true
      }
    }

    return false
  }

  console.log({originalActuals})
  console.log({targets, targetsToActuals, actualsComplete: actualsComplete(), editingActual, actualsHaveChanged: acutalsHaveChanged()})

  return (

    <div className="revising-or-saved-container inputs-and-targets-revising-container">

        <ul className='list inputs-list'>

          {targets.map(target =>{ 

            const actualName = targetsToActuals[target.field_name].name
            const actualValue = targetsToActuals[target.field_name].value 
            
            const labelText = ''

            return( 
            <li
            key={target.field_name}
            style={{border: `1px dotted ${routineColor ? routineColor : 'var(--routine-red)'}`}} 
            className='list-item inputs-list-list-item'>
                <div className='list-item-top'>

                  <div className='target-and-result'>
                    <div 
                    className='target-container'>
                      {target.name}: {target.value}
                    </div>  
                    <div 
                    className='result-container'>
                      {actualName}: {actualValue !== 'not recorded' ? actualValue : <span className='not-recorded-span'>{actualValue}</span>}
                    </div>
                  </div>
                  
                  {editingActual !== actualName && 
                  <Button
                  onClick={() => setEditingActual(actualName)}
                  variant='outline-primary'
                  className='edit-button'>
                    Edit
                  </Button>}

                  {editingActual === actualName && 
                  <Button
                  onClick={() => setEditingActual(false)}
                  variant='outline-primary'
                  className='edit-button'>
                    Done
                  </Button>}

                </div>

                <div className={`list-item-bottom  ${editingActual === actualName ? 'show-list-item-bottom' : ''}`}>
                  <RecordSetInput
                  field={targetsToActuals[target.field_name].field_name}
                  labelText={labelText} />
                </div>


            </li>

            )
          })}

        </ul>

        {actualsComplete()  && acutalsHaveChanged() &&
        <Button
        disabled={!actualsComplete() || !acutalsHaveChanged()}
        onClick={handleSubmit}
        variant={actualsComplete()  && acutalsHaveChanged() ? 'outline-success' : 'outline-secondary'}
        className='submit-all-btn'>
          Submit
        </Button>}
        
      </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  saveExerciseSetChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordInputs)
