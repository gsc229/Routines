import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {createSetGroup} from './previewSetGroupHelpers'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {setCurrentSetGroupSets} from '../../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {FaRegHandPointLeft} from 'react-icons/fa'
import {GiBiceps} from 'react-icons/gi'
import ExerciseSetCard from '../../exercise_set/card_exercise_set/ExerciseSetCard'
import { ConnectedPreviousStepButton } from '../form_create_set_group/SetGroupBtnsAndInputs';

export const PreviewSetGroup = ({
  writingCreateSetGroupData,
  chosenExercises,
  currentSetGroup,
  createSetGroupData,
  currentExerciseSet,
  currentSetGroupSets,
  setCurrentSetGroupSets
}) => {

  useEffect(() => {

    setCurrentSetGroupSets(createSetGroup(
      chosenExercises,
      currentSetGroup, 
      createSetGroupData,
      currentExerciseSet))

  }, [])

  console.log({currentSetGroupSets})

  const handleCreateSetGroup = () => {
    //
    return 
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
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  writingCreateSetGroupData,
  setCurrentSetGroupSets
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSetGroup)
