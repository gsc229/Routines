import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

export const AddSetCard = ({
  exercise
}) => {
  return (
    <Card 
    bg="dark"
    text='white'
    className='add-set-card'>
      <Card.Header>
        <span className={`${exercise.muscle_group}-color`}>{exercise.muscle_group}</span>
        <Card.Link onClick={handleEditClick} as={Link} to='/create-exercise'>Edit</Card.Link>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Card.Text>{exercise.name}</Card.Text>
        </Card.Title>
        <Card.Subtitle>
          <span className={`${exercise.category}-color`}>{exercise.category}</span>
        </Card.Subtitle>
        {exercise.description && <Card.Text><span>Description:</span> {exercise.description}</Card.Text>}
        {exercise.equipment && <Card.Text><spand>Equipment: </spand>{exercise.equipment}</Card.Text>}
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
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSetCard)
