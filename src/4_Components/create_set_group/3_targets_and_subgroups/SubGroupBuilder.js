import React, {useState} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import SubGroupBuilderTabs from './SubGroupBuilderTabs'

export const SetGroupBuilder = ({
  writingCreateSetGroupData,
  createSetGroupData,
  inputSize
}) => {

  const {total_sets} = createSetGroupData

  return (
    <Container className='sub-group-builder-container'>
      <Row className='sets-row'> 
          <Col className='sets-column' xs='5'>
            <Form>
              <Form.Group>
                <Form.Label>How many sets?</Form.Label>
                <Form.Control onChange={(e) => writingCreateSetGroupData('total_sets', JSON.parse(e.target.value))} size={inputSize} type='number' min={1} max={100} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {total_sets > 0 && 
        <SubGroupBuilderTabs inputSize={inputSize} />}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupBuilder)
