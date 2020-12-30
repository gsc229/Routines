import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import AttachExerciseToSetGroupCard from '../card_set_group/AttachExerciseToSetGroupCard'
import SearchExercisesForm from '../../exercise/form_search_exercises/SearchExercisesForm'
import {FiArrowLeft} from 'react-icons/fi'
import Button from 'react-bootstrap/Button'


export const SetGroupSearchExercise = ({
  exerciseSearchResults,
  writingCreateSetGroupData
}) => {

  return (
    <div className='set-group-exercise-search'>
      <Button 
      onClick={() => writingCreateSetGroupData('currentStep','choose-type')}>
        <FiArrowLeft 
        style={{color: 'white'}}
        className='previous-link'/>
         Back to set group type
      </Button>
      <SearchExercisesForm/>
      <div className='set-group-exercise-search-results'>
        {exerciseSearchResults.map(exercise=>{ 
          return(
            <AttachExerciseToSetGroupCard exercise={exercise} />
          )})}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  exerciseSearchResults: state.exerciseReducer.exerciseSearchResults
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupSearchExercise)
