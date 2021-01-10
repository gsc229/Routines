import React from 'react'
import { connect } from 'react-redux'
import {addChosenExercise, removeChosenExercise} from '../../../1_Actions/setGroupActions'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import IFrame from '../../iframe/IFrame'
import {} from '../3_form_create_set_group/ConnectedDecrementLabeled'
import SetGroupInfoForm from '../3_form_create_set_group/SetGroupInfoForm'
import {ConnectedBtnNextExercise, ConnectedBtnPrevExercise} from '../3_form_create_set_group/ConnectedBtnsCycleChosenExercise'
export const SetCardDetailInputs = ({
  exercise,
  chosenExercises,
  currentSetGroup,
  showNextStepBtn,
  showNextStepBtnOnCardBtn,
  showRemoveExerciseBtn,
  shwoAddExerciseBtn,
  nextStep,
  nextStepText
}) => {

  const selected = chosenExercises.find(chosenEx => chosenEx._id === exercise._id)
  
  return (
    <Card 
    bg="dark"
    text='white'
    className={`enter-set-info-card exercise-card`}>
      <Card.Header>
        <span className={`${exercise.muscle_group}-color`}>{exercise.muscle_group}</span>
        <Card.Subtitle>
          <span className={`${exercise.category}-color`}>{exercise.category}</span>
          </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Title>


          <Card.Text>{exercise.name}</Card.Text>
          <div className="next-prev-exercise-btns">
          <ConnectedBtnPrevExercise variant='warning' />
          <ConnectedBtnNextExercise variant='info' />
          </div>

          
          {exercise.description && <Card.Text><span>Description:</span> {exercise.description}</Card.Text>}
          {exercise.equipment && <Card.Text><span>Equipment: </span>{exercise.equipment}</Card.Text>}
          {exercise.target_muscle && <Card.Text><span>Target Muscle: </span>{exercise.target_muscle}</Card.Text>}
          <Card.Subtitle className="card-difficulty">
            Difficulty: {exercise.difficulty_scale}
            <ProgressBar className='progress-bar-outer' variant="primary" now={exercise.difficulty_scale * 10} />  
          </Card.Subtitle>



        </Card.Title>
        <SetGroupInfoForm />
        
        
        {/* <IFrame iframeString={exercise.video_url} /> */}
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  chosenExercises: state.setGroupReducer.chosenExercises
})

const mapDispatchToProps = {
  addChosenExercise,
  removeChosenExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(SetCardDetailInputs)
