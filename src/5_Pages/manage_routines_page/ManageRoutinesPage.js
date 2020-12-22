import React, {useState} from 'react'
import { connect } from 'react-redux'
import {clearCurrentRoutine, setCurrentRoutine, saveRoutineChanges} from '../../1_Actions/routineActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ToolTip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Spinner from 'react-bootstrap/Spinner'
import {FaPlus} from 'react-icons/fa'
import {TiEdit} from 'react-icons/ti'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Calendar from '../../4_Components/calendar/Calendar'
import SaveDiscardExpandBtnGroup from '../../4_Components/buttons/SaveDiscardExpandBtnGroup'
import {GrExpand} from 'react-icons/gr'
import {GiCheckMark} from 'react-icons/gi'
import CreateRoutineForm from '../../4_Components/create_routine/RoutineInfoForm'
import {RiArrowGoBackLine} from 'react-icons/ri'


export const ManageRoutinesPage = ({
  userRoutines, 
  history, 
  currentRoutine,
  clearCurrentRoutine, 
  setCurrentRoutine,
  saveRoutineChanges,
  crudingRoutine
}) => {

  const [editingMode, setEditingMode] = useState(false)

  const handleNewClick = () => {
     clearCurrentRoutine()
     history.push('/create-routine')
  }

  const handleSaveClick = () => {
    saveRoutineChanges(currentRoutine._id, currentRoutine)
    setEditingMode(false)
    clearCurrentRoutine()
  }

  const handleDiscardClick = () => {
    setEditingMode(false)
    clearCurrentRoutine()
  }

  const handleSameComponentEdit = (routine) => {
    setCurrentRoutine(routine)
    setEditingMode(true)
  }

  const editInCreatePage = (routine) => {
    console.log({routine})
    if(currentRoutine._id !== routine._id) setCurrentRoutine(routine)
    history.push('/create-routine')
  }

  const handleToggle = () => {
    setEditingMode(false)
    clearCurrentRoutine()
  }

  const showDetails = (routine) => {
    return (
      <ul className='list-group'>
        <li><strong>Category:</strong> {routine.category ? routine.category : 'none chosen'}</li>
        <li><strong>Difficulty: </strong>{routine.difficulty_scale ? routine.difficulty_scale : 'none chosen'}</li>
        <li><strong>Muscle Group: </strong>{routine.muscle_group ? routine.muscle_group : 'none chosen'}</li>
        <li><strong>Body Part: </strong>{routine.body_part ? routine.body_part : 'none chosen'}</li>
        <li><strong>Target Muscle: </strong>{routine.target_muscle ? routine.target_muscle : 'none chosen'}</li>
        <li><strong>Description: </strong>
          {routine.description ? <p>{routine.description}</p> : <p>This routine has no description yet.</p>}
        </li>
      </ul>  
    )
  }

  return (
    <LayoutOne showTop={false}>
      <Container className='manage-routines container'>
        <Row>
          <Col lg='8' md='12' className="routines-column">
            <div className="options-menu">
                <Button onClick={handleNewClick} variant='primary' id='new-routine' aria-current="page"><FaPlus /> New</Button>
            </div> 
            <Accordion defaultActiveKey={userRoutines[0]._id} className="routines-bank">
              {userRoutines && userRoutines.map(routine=>
                {return (
                <Card style={{border: 'none'}} bg="dark" key={routine._id}>
    
                  <Card.Header style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
                    <Accordion.Toggle
                    disabled={editingMode}
                    as={Button} 
                    onClick={handleToggle}
                    style={{width: '100%', display: 'flex', justifyContent: 'center', postion: 'relative'}} 
                    eventKey={routine._id} >
                      {routine.name}
                    </Accordion.Toggle>
                  </Card.Header>
    
                  <Accordion.Collapse eventKey={routine._id}>
                    <Card.Body style={{backgroundColor: 'white'}}>
    
                    <div className='details-and-btns-container' style={{flexDirection: `${editingMode ? 'column' : 'row-reverse'}`}} >
                      
                      {crudingRoutine && <Spinner className="spinner" animation='border' variant='dark'  />}
                      <div className='edit-complete-expand-btns'>
                      {!editingMode && 
                      <OverlayTrigger
                        key="left"
                        placement="left"
                        overlay={
                          <ToolTip>
                            Edit these details
                          </ToolTip>
                        }
                      > 
                        <TiEdit className='click-edit-btn cmd-btn' onClick={() => handleSameComponentEdit(routine)} /> 
                      </OverlayTrigger>}
                      {editingMode && !crudingRoutine &&
                      <SaveDiscardExpandBtnGroup
                      saveOnClick={handleSaveClick}
                      discardOnClick={handleDiscardClick}
                      expandOnclick={() => editInCreatePage(routine)}
                      />}
                      </div>
                      {!editingMode && !crudingRoutine && showDetails(routine)}
                      {editingMode && currentRoutine._id === routine._id && !crudingRoutine &&
                      <CreateRoutineForm 
                      disguardBtn={false}
                      saveBtn={false}
                      finishLaterBtn={false}
                      goToExerciseBank={false}
                      continueEditingBtn={false}
                      goToWeekBtn={false}
                      showHeader={false} />}
                    </div>
                    <Calendar calendarId='manage-routines-calendar' />        
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>)})}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines,
  currentRoutine: state.routineReducer.currentRoutine,
  crudingRoutine: state.routineReducer.crudingRoutine
})

const mapDispatchToProps = {
  clearCurrentRoutine,
  setCurrentRoutine,
  saveRoutineChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoutinesPage)


