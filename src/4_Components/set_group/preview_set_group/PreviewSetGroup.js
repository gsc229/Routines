import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {createSetGroupLocal} from './previewSetGroupHelpers'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import {setCurrentSetGroupSets} from '../../../1_Actions/exerciseSetActions'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ExerciseSetCard from '../../exercise_set/card_exercise_set/ExerciseSetCard'
import { ConnectedPreviousStepButton} from '../set_group_btns_and_inputs/SetGroupBtnsAndInputs';
import CreateSetGroupBtn from '../set_group_btns_and_inputs/CreateSetGroupBtn'

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
      <Container>
        <Row className='preview-set-group-top-buttons'>
          <Col className='set-group-btn-column' sm='12' md='6'>
            <ConnectedPreviousStepButton
            writeDataKey='currentStep'
            writeDataValue='enter-info' 
            text='Back to Info Input'
            />
          </Col>
          <Col className='set-group-btn-column' sm='12' md='6'>
            <CreateSetGroupBtn />
          </Col>
          <Col sm='12'>
          <h3>Preview Set Group: {currentSetGroup.name ? currentSetGroup.name : 'No Name'}</h3>
          </Col>
        </Row>
      </Container>
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
