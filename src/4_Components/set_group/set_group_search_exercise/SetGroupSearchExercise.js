import React from 'react'
import { connect } from 'react-redux'
import { writingCreateSetGroupData } from '../../../1_Actions/setGroupActions'
import SearchExercisesForm from '../../exercise/form_search_exercises/SearchExercisesForm'
import DarkSpinner from '../../spinners/DarkSpinner'
import AttachExerciseToSetGroupCard from '../card_set_group/AttachExerciseToSetGroupCard'
import ChosenExercisesBank from './ChosenExercisesBank'
import { ConnectedPreviousStepButton } from '../form_create_set_group/SetGroupBtnsAndInputs'


export const SetGroupSearchExercise = ({
  exerciseSearchResults,
  crudingExercise,
  chosenExercises
}) => {

  return (
    <div className='set-group-exercise-search'>
      <ConnectedPreviousStepButton 
        text='Back to set group type'
        writeDataKey='currentStep'
        writeDataValue='choose-type'/>
      <SearchExercisesForm/>
      {chosenExercises.length > 0 &&
       <ChosenExercisesBank />}
      {crudingExercise === 'fetching' &&
      <DarkSpinner />}

      {exerciseSearchResults.length > 0 && 
      <div className='set-group-exercise-search-results'>
        {exerciseSearchResults.map(exercise=>{ 
          return(
            <AttachExerciseToSetGroupCard 
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
