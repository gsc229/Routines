import React from 'react'
import { connect } from 'react-redux'
import ExerciseForm from '../../4_Components/form_exercise/ExerciseForm'
import SelectTypeForm from '../form_create_set_group/SelectTypeForm'
import SearchExercisesFrom from '../../4_Components/form_search_exercises/SearchExercisesForm'
import AttachExerciseToSetGroupCard from '../../4_Components/card_set_group/AttachExerciseToSetGroupCard'

export const CreateSetGroup = ({
  exerciseSearchResults
}) => {
  return (
    <div>
      <SelectTypeForm />
      <SearchExercisesFrom />
      <div className='attach-exercise-to-set-group-search-results'>
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
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroup)
