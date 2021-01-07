import React from 'react'
import { connect } from 'react-redux'
import {addChosenExercise, removeChosenExercise} from '../../../1_Actions/setGroupActions'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import IFrame from '../../iframe/IFrame'
import AddRemoveButtons from './AddRemoveBtnConfigs'

export const AttachExerciseToSetGroupCard = ({
  exercise,
  chosenExercises
}) => {

  const selected = chosenExercises.find(chosenEx => chosenEx._id === exercise._id)
  
  return (
    <Card 
    bg="dark"
    text='white'
    className={`attach-exercise-to-set-card ${selected && 'selected-card'}`}>
      <Card.Header>
        <span className={`${exercise.muscle_group}-color`}>{exercise.muscle_group}</span>
      </Card.Header>
      <Card.Body>
        <AddRemoveButtons exercise={exercise} />
        <Card.Title>
          <Card.Text>{exercise.name}</Card.Text>
        </Card.Title>
        <Card.Subtitle>
          <span className={`${exercise.category}-color`}>{exercise.category}</span>
        </Card.Subtitle>
        {exercise.description && <Card.Text><span>Description:</span> {exercise.description}</Card.Text>}
        {exercise.equipment && <Card.Text><span>Equipment: </span>{exercise.equipment}</Card.Text>}
        {exercise.target_muscle && <Card.Text><span>Target Muscle: </span>{exercise.target_muscle}</Card.Text>}
        <Card.Subtitle className="card-difficulty">
          Difficulty: {exercise.difficulty_scale}
          <ProgressBar className='progress-bar-outer' variant="primary" now={exercise.difficulty_scale * 10} />  
        </Card.Subtitle>
        <IFrame iframeString={exercise.video_url} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AttachExerciseToSetGroupCard)
