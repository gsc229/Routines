import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {setCurrentExercise} from '../../../1_Actions/exerciseActions'
import {addChosenExercise, removeChosenExercise} from '../../../1_Actions/setGroupActions'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import IFrame from '../../iframe/IFrame'

export const AttachExerciseToSetGroupCard = ({
  exercise,
  currentSetGroup,
  addChosenExercise,
  chosenExercises,
  removeChosenExercise
}) => {

  const handleEditClick = () => {
    setCurrentExercise(exercise)
  }

  const removeButton = () => {
    return chosenExercises.find(inChosen => inChosen._id === exercise._id) && 
    <div className='card-link-container'>
      <Link
      to='#'
      onClick={() => removeChosenExercise(exercise._id)}
      className='card-link remove-from-set-link'
      >Remove from {currentSetGroup.set_group_type} Set</Link>
    </div>
  }

  const addButton = () => {
    return !chosenExercises.find(inChosen => inChosen._id === exercise._id ) && 
    <div className='card-link-container'>
      <Link
      to='#'
      onClick={() => addChosenExercise(exercise)}
      className='card-link add-to-set-link'>Add to {currentSetGroup.set_group_type} Set</Link>
    </div>
  }

  return (
    <Card 
    bg="dark"
    text='white'
    className='attach-exercise-to-set-card'>
      <Card.Header>
        <span className={`${exercise.muscle_group}-color`}>{exercise.muscle_group}</span>
      </Card.Header>
      <Card.Body>
        {removeButton()}
        {addButton()}
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
