import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Link} from 'react-router-dom'

export const ExerciseCard = ({
  exercise
}) => {

  const handleEditClick = () => {
    return
  }


  return (
    <Card
    className="mb-2 exercise-card"
    bg="dark"
    text='white'
    style={{ width: '18rem' }}
  >
    <Card.Header>
      <span className={`${exercise.name}-color`}>{exercise.muscle_group}</span>
      <Card.Link as={Link} to='/'>Edit</Card.Link>
    </Card.Header>
    <Card.Body>
      <Card.Title>
        <Card.Text>{exercise.name}</Card.Text>
      </Card.Title>
      <Card.Subtitle>
        <span className={`${exercise.category}-color`}>{exercise.category}</span>
      </Card.Subtitle>
      {exercise.description && <Card.Text><span>Description:</span> {exercise.description}</Card.Text>}
      <Card.Text>
        Difficulty: <span>{exercise.difficulty_scale}</span>
        <ProgressBar variant="primary" now={exercise.difficulty_scale * 10} />
      </Card.Text>
      <Card.Text>
        {exercise.description}
      </Card.Text>
    </Card.Body>
  </Card>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard)
