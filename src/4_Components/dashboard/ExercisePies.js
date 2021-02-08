import React from 'react'
import NivoPie from '../pie_chart/NivoPie'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ExercisePies = ({
  muscleGroupCount, 
  exerciseNameExSetCount
}) => {
  return (
    <div className='exercise-pies-container'>
      <Row>
        <Col className='pie-column muscle-group-column' sm='12' md='6'>
          <h5>Sets by Muscle Group:</h5>
          <NivoPie 
          useColor={true}
          exSetStratumData={muscleGroupCount}  />
        </Col>
        <Col className='pie-column exercises-column' sm='12' md='6'>
          <h5>Sets by Exercise: </h5>
          <NivoPie exSetStratumData={exerciseNameExSetCount} />
        </Col>
      </Row>
    </div>
  )
}

export default ExercisePies
