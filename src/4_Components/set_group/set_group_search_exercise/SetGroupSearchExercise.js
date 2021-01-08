import React from 'react'
import { connect } from 'react-redux'
import { writingCreateSetGroupData } from '../../../1_Actions/setGroupActions'
import SearchExercisesForm from '../../exercise/form_search_exercises/SearchExercisesForm'
import DarkSpinner from '../../spinners/DarkSpinner'
import AttachExerciseToSetGroupCard from '../card_set_group/AttachExerciseToSetGroupCard'
import ChosenExercisesBank from './ChosenExercisesBank'
import { ConnectedPreviousStepButton, ConnectedNextStepButton } from '../form_create_set_group/SetGroupBtnsAndInputs'
import Container from 'react-bootstrap/Container'
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
      <div className='set-group-exercise-search-btns-container'>
        <Row className='btn-row'>
          <Col className='btn-column'  sm='12' md='6'>
            <ConnectedPreviousStepButton 
              text='Back to set group type'
              writeDataKey='currentStep'
              writeDataValue='choose-type'/>
          </Col>

          <Col className='btn-column'  sm='12' md='6'>
           
            <ConnectedNextStepButton
            disabled={chosenExercises.length > 0}
            variant='success'
            writeDataKey='currentStep'
            writeDataValue='enter-info'
            text={`Enter ${currentSetGroup.set_group_type} Set Info`}/>
          </Col>

        </Row>
      </div>
      
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
