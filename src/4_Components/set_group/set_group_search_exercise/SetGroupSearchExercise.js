import React from 'react'
import { connect } from 'react-redux'
import { writingCreateSetGroupData } from '../../../1_Actions/setGroupActions'
import SearchExercisesForm from '../../exercise/form_search_exercises/SearchExercisesForm'
import DarkSpinner from '../../spinners/DarkSpinner'
import AttachExerciseToSetGroupCard from '../card_set_group/AttachExerciseToSetGroupCard'
import ChosenExercisesBank from './ChosenExercisesBank'
import { ConnectedPreviousStepButton, ConnectedNextStepButton } from '../set_group_btns_and_inputs/SetGroupBtnsAndInputs'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const SetGroupSearchExercise = ({
  exerciseSearchResults,
  crudingExercise,
  chosenExercises,
  currentSetGroup
}) => {

 

  return (
    <div className='set-group-exercise-search'>
      <SearchExercisesForm />

      {chosenExercises.length > 0 &&
       <ChosenExercisesBank />}

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
