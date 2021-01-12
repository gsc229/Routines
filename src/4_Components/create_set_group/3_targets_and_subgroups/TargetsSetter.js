import React, {useState} from 'react'
import { connect } from 'react-redux'
import {ConnectedDynamicFieldInputForExerciseSet} from '../3_form_create_set_group/ConnectedInputsLabeledForExerciseSet'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {WeightIcon, TimeIcon, DistanceIcon, SwimLapsIcon, RepsIcon} from '../../icons/Icons'
import Container from 'react-bootstrap/Container'


export const TargetsBuilder = (props) => {

  return (
    <Container className='targets-setter-container'>
      <Tab.Container id="targets-setter" defaultActiveKey="target_weight">
        <Row className='tabs-row'>
          <Col className='tabs-column' xs={12}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item
              className='target-setter-tab-item'>
                <Nav.Link 
                className='target-setter-tab-link'
                eventKey="target_weight">
                  <WeightIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='target-setter-tab-item'>
                <Nav.Link 
                className='target-setter-tab-link'
                eventKey="target_reps">
                  <RepsIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='target-setter-tab-item'>
                <Nav.Link 
                className='target-setter-tab-link'
                eventKey="target_time">
                  <TimeIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='target-setter-tab-item'>
                <Nav.Link 
                className='target-setter-tab-link'
                eventKey="target_distance">
                  <DistanceIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='target-setter-tab-item'>
                <Nav.Link 
                className='target-setter-tab-link'
                eventKey="target_laps">
                  <SwimLapsIcon />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane 
              className='target-setter-tab-pande'
              eventKey="target_weight">
                <ConnectedDynamicFieldInputForExerciseSet
                  label='Weight'
                  field='target_weight'
                />
              </Tab.Pane>
              <Tab.Pane 
              className='target-setter-tab-pande'
              eventKey="target_reps">
                <ConnectedDynamicFieldInputForExerciseSet
                  label='Reps Per Set'
                  field='target_reps'
                />
              </Tab.Pane>
              <Tab.Pane 
              className='target-setter-tab-pande'
              eventKey="target_time">
                <ConnectedDynamicFieldInputForExerciseSet
                  field='target_time'
                  label='Time'  
                />              
              </Tab.Pane>
              <Tab.Pane 
              className='target-setter-tab-pande'
              eventKey="target_distance">
                <ConnectedDynamicFieldInputForExerciseSet
                  field='target_distance'
                  label='Distance'  
                />              
              </Tab.Pane>
              <Tab.Pane 
              className='target-setter-tab-pande'
              eventKey="target_laps">
                <ConnectedDynamicFieldInputForExerciseSet
                  field='target_laps'
                  label='Laps'  
                />              
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetsBuilder)
