import React, {useState} from 'react'
import { connect } from 'react-redux'
import {addToCurrentExerciseSets,  removeFromCurrentExerciseSetsByExerciseID} from '../../../1_Actions/exerciseSetActions'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import IFrame from '../../iframe/IFrame'
import AddRemoveButtons from './AttachCardBtnConfigs'
export const AttachExerciseToSetGroupCard = ({
  exercise,
  currentExerciseSets,
  nextStep,
  nextStepText
}) => {

  
  const [showAddedAlert, setShowAddedAlert] = useState(false)
  const selected = currentExerciseSets.find(exSet => exSet.exercise._id === exercise._id)
  const count = currentExerciseSets.reduce((counter, exSet) => exSet.exercise._id === exercise._id ? counter += 1 : counter, 0)
  const indexes = []
  currentExerciseSets.forEach((exSet, index) => {if(exSet.exercise._id === exercise._id) indexes.push(index + 1)} )
  
  return (
    <Card 
    bg="dark"
    text='white'
    className={`attach-exercise-to-set-card ${selected && 'selected-card'}`}>
      <Card.Header>

        <span className={`${exercise.muscle_group}-color`}>{exercise.name}</span>
        <span className='count'>
          {indexes.length ? indexes.length > 1 ? "Sets:" : "Set:" : ''}&nbsp;
          {indexes.map((num, idx )=> `${num}${indexes.length > 1 && idx !== indexes.length - 1 ? "," : ""}`)}
        </span>
        
      </Card.Header>
      <Card.Body>
        <div 
        className={`added-alert ${showAddedAlert ? 'show-added-alert' : 'hide-added-alert'}`} 
        variant='success'>
          Added to set group!
        </div>

        <AddRemoveButtons
        setShowAddedAlert={setShowAddedAlert}
        showNextStepBtnOnCardBtn={true}
        showRemoveExerciseBtn={true}
        shwoAddExerciseBtn={true}
        nextStep={nextStep}
        nextStepText={nextStepText}
        exercise={exercise} />

        <Card.Title>
          <Card.Text>{exercise.muscle_group}</Card.Text>
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
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  addToCurrentExerciseSets,
   removeFromCurrentExerciseSetsByExerciseID
}

export default connect(mapStateToProps, mapDispatchToProps)(AttachExerciseToSetGroupCard)
