import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {createSetGroupLocal} from './previewSetGroupHelpers'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import {writingCreateSetGroupData, createNewSetGroup} from '../../../1_Actions/setGroupActions'
import {createNewExerciseSets} from '../../../1_Actions/exerciseSetActions'
import {setCurrentSetGroupSets} from '../../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {GiBiceps} from 'react-icons/gi'
import ExerciseSetCard from '../../exercise_set/card_exercise_set/ExerciseSetCard'
import { ConnectedPreviousStepButton, ConnectedTotalSetsInput } from '../form_create_set_group/SetGroupBtnsAndInputs';

export const PreviewSetGroup = ({
  writingCreateSetGroupData,
  chosenExercises,
  currentSetGroup,
  createSetGroupData,
  currentExerciseSet,
  currentSetGroupSets,
  setCurrentSetGroupSets,
  createNewSetGroup,
  createNewExerciseSets,
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
      alert(set_group_error_message, exercise_set_error_message)
      setTimeout(() => {
        clearErrorMessage()
      }, 3000);
    }
  },[set_group_error_message, exercise_set_error_message])

  console.log({currentSetGroupSets})

  const handleCreateSetGroup = async () => {
    console.log("CREATE NEW SET GROUP")
    const newSetGroupResponse = await createNewSetGroup(currentSetGroup)
    console.log({newSetGroupResponse})
    if(newSetGroupResponse.success){
      const setsWithSetGroupAndExerciseIds = currentSetGroupSets.map(set=>{
        return{
          ...set,
          exercise: set.exercise._id,
          set_group: newSetGroupResponse.data._id
        }
      })
      console.log({setsWithSetGroupAndExerciseIds})
      const {routine, week} = currentSetGroup
      createNewExerciseSets({
        routine, 
        week, 
        set_group: newSetGroupResponse.data._id, 
        newSetsArray: setsWithSetGroupAndExerciseIds})
    }
  }

  return (
    <div className='preview-set-group-container'>
      <h3>Preview Set Group</h3>
      <Container>
        <Row className='preview-set-group-top-buttons'>
          <Col className='set-group-btn-column' sm='12' md='6'>
            <ConnectedPreviousStepButton
            writeDataKey='currentStep'
            writeDataValue='choose-exercise' 
            text='Go back to choose exercises'
            />
          </Col>
          <Col className='set-group-btn-column' sm='12' md='6'>
            <Button
            variant='success'
            onClick={handleCreateSetGroup}>
              Create Set Group&nbsp;
              <GiBiceps/>
            </Button>
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
  writingCreateSetGroupData,
  setCurrentSetGroupSets,
  createNewSetGroup,
  createNewExerciseSets,
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSetGroup)
