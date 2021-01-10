import React from 'react'
import { connect } from 'react-redux'
import { writingCreateSetGroupData } from '../../../1_Actions/setGroupActions'
import SearchExercisesForm from '../../exercise/form_search_exercises/SearchExercisesForm'
import DarkSpinner from '../../spinners/DarkSpinner'
import AttachExerciseToSetGroupCard from '../3_create_set_group_search_ex_card/AttachExerciseToSetGroupCard'
import ChosenExercisesBankDND from './ChosenExercisesBankDND'

export const SetGroupSearchExercise = ({
  exerciseSearchResults,
  crudingExercise,
  chosenExercises,
  currentSetGroup
}) => {

 

  return (
    <div className='set-group-exercise-search'>
      
     
      <ChosenExercisesBankDND />
      <SearchExercisesForm />

      {crudingExercise === 'fetching' &&
      <DarkSpinner />}

      {exerciseSearchResults.length > 0 && 
      <div className='set-group-exercise-search-results'>
        {exerciseSearchResults.map(exercise=>{ 
          return(
            <AttachExerciseToSetGroupCard
            nextStep='enter-info'
            nextStepText={`Enter ${currentSetGroup.set_group_type} Set Info`}
            key={exercise._id}
            exercise={exercise} />
          )})}
      </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  exerciseSearchResults: state.exerciseReducer.exerciseSearchResults,
  crudingExercise: state.exerciseReducer.crudingExercise,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  chosenExercises: state.setGroupReducer.chosenExercises
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupSearchExercise)
