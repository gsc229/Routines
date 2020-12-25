import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {clearCurrentRoutine, setCurrentRoutine, saveRoutineChanges} from '../../1_Actions/routineActions'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ToolTip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {TiEdit} from 'react-icons/ti'
import Calendar from '../calendar/Calendar'
import SaveDiscardExpandBtnGroup from '../buttons/SaveDiscardExpandBtnGroup'
import CreateRoutineForm from '../form_routine/RoutineInfoForm'
import DarkSpinner from '../spinners/DarkSpinner'

export const RoutinesAccordion = ({
  userRoutines,
  currentRoutine,
  clearCurrentRoutine, 
  setCurrentRoutine,
  saveRoutineChanges,
  crudingRoutine
}) => {

  const [editingMode, setEditingMode] = useState(false)
  const [showSpinner, setshowSpinner] = useState(false)


  useEffect(() => {
    if(crudingRoutine === 'updating'){
      setshowSpinner(true)
    }
  }, [crudingRoutine])

 
  if(showSpinner){
    setTimeout(() => {
      setshowSpinner(false)
    }, 800)
  }
  
  const history = useHistory()

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
        <li><strong>Start Date: </strong>{routine.start_date ? routine.start_date : 'none chosen'}</li>
        <li><strong>End Date: </strong>{routine.end_date ? routine.end_date : 'n/a'}</li>
        <li><strong>Description: </strong>
          {routine.description ? <p>{routine.description}</p> : <p>This routine has no description yet.</p>}
        </li>
      </ul>  
    )
  }
  return (
    <Accordion defaultActiveKey={userRoutines[0]._id} className="routines-bank">
      {userRoutines && userRoutines.map(routine=>
        {return (
        <Card bg="dark" key={routine._id}>

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
            <Card.Body>

            <div className='details-and-btns-container' style={{flexDirection: `${editingMode ? 'column' : 'row-reverse'}`}} >
              
              {crudingRoutine && <DarkSpinner />}
              <div className='edit-complete-expand-btns'>
              {!editingMode && !showSpinner && 
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

              {editingMode && !showSpinner &&
              <SaveDiscardExpandBtnGroup
              saveOnClick={handleSaveClick}
              discardOnClick={handleDiscardClick}
              expandOnclick={() => editInCreatePage(routine)}
              />}

              </div>

              {!editingMode && !showSpinner &&  showDetails(routine)}
              {showSpinner && <DarkSpinner style={{marginBottom: '50px', height: '300px'}} />}

              {editingMode && currentRoutine._id === routine._id && !crudingRoutine &&
              <CreateRoutineForm 
              discardBtn={true}
              discardCallback={() => setEditingMode(false)}
              showFinishLaterBtn={false}
              showHeader={false} />}


            </div>
            {!editingMode && 
            <Calendar 
            calendarId='manage-routines-calendar' />   }     
            </Card.Body>
          </Accordion.Collapse>
        </Card>)})}
      </Accordion>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesAccordion)
