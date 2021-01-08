import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {createSetGroupLocal} from './previewSetGroupHelpers'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import {setCurrentSetGroupSets} from '../../../1_Actions/exerciseSetActions'
import ExerciseSetCard from '../../exercise_set/card_exercise_set/ExerciseSetCard'

 
export const PreviewSetGroup = ({
  chosenExercises,
  currentSetGroup,
  createSetGroupData,
  currentExerciseSet,
  currentSetGroupSets,
  setCurrentSetGroupSets,
  set_group_error_message,
  exercise_set_error_message,
  clearErrorMessage
}) => {

  useEffect(() => {
    setCurrentSetGroupSets(createSetGroupLocal(
      chosenExercises,
      currentSetGroup, 
      createSetGroupData,
      currentExerciseSet))

  }, [])

  useEffect(() => {
    if(set_group_error_message || exercise_set_error_message){
      alert(JSON.stringify({set_group_error_message, exercise_set_error_message}))
      setTimeout(() => {
        clearErrorMessage()
      }, 3000);
    }
  },[set_group_error_message, exercise_set_error_message])
  
  return (
    <div className='preview-set-group-container'>
      <div className="set-groups">
        {currentSetGroupSets.length > 0 && 
        currentSetGroupSets.map((set, index) => 
        <ExerciseSetCard key={index} setNumber={index + 1}  exerciseSet={set} /> 
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentSetGroupSets: state.exerciseSetReducer.currentSetGroupSets,
  chosenExercises: state.setGroupReducer.chosenExercises,
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  set_group_error_message: state.setGroupReducer.error_message,
  exercise_set_error_message: state.exerciseSetReducer.error_message
})

const mapDispatchToProps = {
  setCurrentSetGroupSets,
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSetGroup)
