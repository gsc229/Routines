import React, {useState} from 'react'
import { connect } from 'react-redux'
import {clearCurrentRoutine} from '../../1_Actions/routineActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {FaPlus} from 'react-icons/fa'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Calendar from '../../4_Components/calendar/Calendar'

export const ManageRoutines = ({userRoutines, history, clearCurrentRoutine}) => {

  const handleNewClick = () => {
     clearCurrentRoutine()
     history.push('/create-routine')
  }

  return (
    <LayoutOne showTop={false}>
      <Container className='manage-routines'>
        <h1>Manage Routines</h1>
        <Row>
          <Col xl={4} className='routines-container'>
            <div className="options-menu">
                <Button onClick={handleNewClick} variant='outline-success' id='new-routine' aria-current="page"><FaPlus /> New</Button>
            </div>            
            <Accordion defaultActiveKey={userRoutines && userRoutines[0]._id} className="routines-bank">
              {userRoutines && userRoutines.map(routine=>
                {return (
                <Card style={{border: 'none'}} bg="dark" key={routine._id}>
                  <Card.Header>
                    <Accordion.Toggle as={Button} style={{width: '100%'}} eventKey={routine._id} >
                         {routine.name}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={routine._id}>
                    <Card.Body style={{backgroundColor: 'white'}}>
                    <ul className='list-group'>
                      <li><strong>Category:</strong> {routine.category ? routine.category : 'none chosen'}</li>
                      <li><strong>Difficulty: </strong>{routine.difficulty ? routine.difficulty : 'none chosen'}</li>
                      <li><strong>Muscle Group: </strong>{routine.muscle_group ? routine.muscle_group : 'none chosen'}</li>
                      <li><strong>Body Part: </strong>{routine.body_part ? routine.body_part : 'none chosen'}</li>
                      <li><strong>Target Muscle: </strong>{routine.target_muscle ? routine.target_muscle : 'none chosen'}</li>
                      <li><strong>Description: </strong>
                        {routine.description ? <p>{routine.description}</p> : <p>This routine has no description yet.</p>}
                      </li>
                    </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>)})}
            </Accordion>
          </Col>
          <Col xl={8} className="stats-container">
            <Calendar calendarId='manage-routines-calendar' />
          </Col>
        </Row>
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  clearCurrentRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoutines)


