import React from 'react'
import { connect } from 'react-redux'
import ConnectedRowSetGroupAutoGen from '../3_form_create_set_group/ConnectedRowDynamicFieldInputDecIncLabeldForGetGroupAutoGen'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {WeightIcon, TimeIcon, DistanceIcon, SwimLapsIcon, RepsIcon} from '../../icons/Icons'

export const SubGroupBuilderTabs = ({
  inputSize
}) => {
  
  return (
    <Tab.Container id="sub-group-builder" defaultActiveKey="starting_weight">
        
        <label className='choose-target-label'>Choose starting targets</label>
        <Row className='tabs-row' >
          <Col className='tabs-column' xs={12}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item
              className='starting-target-tab-item'>
                <Nav.Link 
                className='starting-target-tab-link'
                eventKey="starting_weight">
                  <WeightIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='starting-target-tab-item'>
                <Nav.Link 
                className='starting-target-tab-link'
                eventKey="starting_reps">
                  <RepsIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='starting-target-tab-item'>
                <Nav.Link 
                className='starting-target-tab-link'
                eventKey="starting_time">
                  <TimeIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='starting-target-tab-item'>
                <Nav.Link 
                className='starting-target-tab-link'
                eventKey="starting_distance">
                  <DistanceIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
              className='starting-target-tab-item'>
                <Nav.Link 
                className='starting-target-tab-link'
                eventKey="starting_laps">
                  <SwimLapsIcon />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
  
  
          <Col xs={9}>
            <Tab.Content>
              <Tab.Pane 
              className='starting-setter-tab-pande'
              eventKey="starting_weight">
                <ConnectedRowSetGroupAutoGen
                  inputSize={inputSize}
                  label='Weight'
                  startingField='starting_weight'
                  showLabel={false}
                />
              </Tab.Pane>
              <Tab.Pane 
              className='starting-setter-tab-pande'
              eventKey="starting_reps">
                <ConnectedRowSetGroupAutoGen
                  inputSize={inputSize}
                  label='Reps Per Set'
                  startingField='starting_reps'
                  showLabel={false}
                />
              </Tab.Pane>
              <Tab.Pane 
              className='starting-setter-tab-pande'
              eventKey="starting_time">
                <ConnectedRowSetGroupAutoGen
                  inputSize={inputSize}
                  startingField='starting_time'
                  showLabel={false}
                />              
              </Tab.Pane>
              <Tab.Pane 
              className='starting-setter-tab-pande'
              eventKey="starting_distance">
                <ConnectedRowSetGroupAutoGen
                  inputSize={inputSize}
                  startingField='starting_distance'
                  showLabel={false}
                />              
              </Tab.Pane>
              <Tab.Pane 
              className='starting-setter-tab-pande'
              eventKey="starting_laps">
                <ConnectedRowSetGroupAutoGen
                  inputSize={inputSize}
                  startingField='starting_laps'
                  showLabel={false} 
                />              
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SubGroupBuilderTabs)
