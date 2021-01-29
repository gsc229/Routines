import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveExerciseSetChanges, setCurrentExerciseSet} from '../../1_Actions/exerciseSetActions'
import RecordSetInput from './RecordSetInput'
import Button from 'react-bootstrap/Button'
import NavLink from 'react-bootstrap/NavLink'

export const RecordInputs = ({
  currentExerciseSet,
  saveExerciseSetChanges,
  setCurrentExerciseSet,
  targets, 
  targetsToActuals,
  routineColor,
  setSessionSaved,
  setUpdateSuccess
}) => {


  const [editingActual, setEditingActual] = useState(null) 
  const [originalActuals, setOriginalActuals] = useState([])

  useEffect(() => {

    const originals = []
    targets.forEach(target => {
      const actualObj = targetsToActuals[target.field_name]
      originals.push(actualObj)
    }) 
    setOriginalActuals(originals)

  }, [currentExerciseSet._id])

  console.log({originalActuals})
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

  console.log({originalActuals, currentExerciseSet})
  console.log({targets, targetsToActuals, actualsComplete: actualsComplete(), editingActual, actualsHaveChanged: acutalsHaveChanged()})

  return (

    <div className="revising-or-saved-container inputs-and-targets-revising-container">
        

          <div className='submit-and-cancel-btns'>
            <Button
            size='sm'
            disabled={!acutalsHaveChanged()}
            onClick={handleSubmit}
            variant='outline-success' 
            className='submit-all-btn'>
              Submit
            </Button>
            <Button
            size='sm'
            disabled={!acutalsHaveChanged()}
            onClick={handleCancel}
            variant='outline-primary'
            className='submit-all-btn'>
              Cancel
            </Button>

          </div>
        

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
                      {actualName}: {actualValue !== null ? actualValue : <span className='not-recorded-span'>not recorded</span>}
                    </div>
                  </div>
                  
                  {editingActual !== actualName && 
                  <NavLink
                  to=''
                  onClick={() => setEditingActual(actualName)}
                  className='edit-button'>
                    Edit
                  </NavLink>}

                  {editingActual === actualName && 
                  <NavLink
                  to=''
                  onClick={() => setEditingActual(false)}
                  className='edit-button'>
                    Done
                  </NavLink>}

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
        
      </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  saveExerciseSetChanges,
  setCurrentExerciseSet
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordInputs)
