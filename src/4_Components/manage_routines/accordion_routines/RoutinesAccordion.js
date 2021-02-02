import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { clearCurrentRoutine, setCurrentRoutine, saveRoutineChanges, createNewRoutine } from '../../../1_Actions/routineActions'
import moment from 'moment'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ToolTip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { TiEdit } from 'react-icons/ti'
import Calendar from '../../calendar/SingleRoutineCalendar'
import SaveDiscardExpandBtnGroup from '../../buttons/SaveDiscardExpandBtnGroup'
import CreateRoutineForm from '../form_routine/RoutineInfoForm'
import DarkSpinner from '../../spinners/DarkSpinner'
import ConfirmDeleteRoutineModal from '../../modals/confirm_delete_modals/ConfirmDeleteRoutineModal'
import fontsizeClamp from '../../../utils/clampBuilder'

export const RoutinesAccordion = ({
  userId,
  userRoutines,
  currentRoutine,
  clearCurrentRoutine, 
  setCurrentRoutine,
  saveRoutineChanges,
  crudingRoutine,
  routineNamesColors,
  createNewRoutine
}) => {

  const [editingMode, setEditingMode] = useState(false)
  const [showSpinner, setshowSpinner] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [routineForDeletion, setRoutineForDeletion] = useState('')

  const spinnerText = {
    'fetching-routines': 'Loading...',
    'deleting-routine': 'Deleting Routine...',
    'updating': 'Saving Routine...'
  }

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
  

  const handleSaveClick = async() => {
    // after the update or save, redirect will depend on whether eiditing old or createing new routine and user input. 
    let response

    if(!currentRoutine.original_creator){
      response = await createNewRoutine({...currentRoutine, original_creator: userId, user: userId})
    }else if(!currentRoutine.user){
      response = await createNewRoutine({...currentRoutine, user: userId})
    } else{
      response = await saveRoutineChanges(currentRoutine._id, currentRoutine)
    }

    if(response && response.success){
      setEditingMode(false)
    }
  }

  const handleDiscardClick = () => {
    setEditingMode(false)
    
    clearCurrentRoutine()
  }

  const handleSameComponentEdit = (routine) => {
    setCurrentRoutine(routine)
    setEditingMode(true)
  }

  const handleToggle = (routine) => {
    setEditingMode(false)
    setCurrentRoutine(routine)
  }


  const routineDescStyles = {
    fontSize: fontsizeClamp(450, 800, .8, 1)
  }

  const showDetails = (routine) => {
    return (
      <div className='list-group-container'>
        <div className='first-two-lists'>
          <ul className='list-group'>
            <li style={routineDescStyles}><strong>Category:</strong><span> {routine.category ? routine.category : 'none chosen'}</span></li>
            <li style={routineDescStyles}><strong>Muscle Group: </strong><span>{routine.muscle_group ? routine.muscle_group : 'none chosen'}</span></li>
            <li style={routineDescStyles}><strong>Target Muscle: </strong><span>{routine.target_muscle ? routine.target_muscle : 'none chosen'}</span></li>
            <li style={routineDescStyles}><strong>End Date: </strong><span>{routine.end_date ? routine.end_date : 'n/a'}</span></li>
          </ul> 
          <ul className='list-group'>
            <li style={routineDescStyles}><strong>Difficulty: </strong><span>{routine.difficulty_scale ? routine.difficulty_scale : 'none chosen'}</span></li>
            <li style={routineDescStyles}><strong>Body Part: </strong><span>{routine.body_part ? routine.body_part : 'none chosen'}</span></li>
            <li style={routineDescStyles}><strong>Start Date: </strong><span>{routine.start_date ? moment(routine.start_date ).format('MMMM DD, YYYY') : 'none chosen'}</span></li>
          </ul>
        </div>
        <ul className='list-group'>
          <li style={routineDescStyles}><strong>Description:</strong><span>
            {routine.description ? <p>{routine.description}</p> : <p>This routine has no description yet.</p>}
          </span></li>
        </ul> 
        <a
          href='#'
          onClick={() => {
            setModalShow(true)
            setRoutineForDeletion(routine)
          }}>DELETE ROUTINE</a> 
      </div>
    )
  }


  const showConfirmDeleteRoutineModal = () => {
    return(
      <ConfirmDeleteRoutineModal  
      setModalShow={setModalShow}
      modalShow={modalShow}
      routine={routineForDeletion}
      />
    )
  }

const getToggleStyles = (routineColor) => {
  
  const color = () => {
    if(editingMode){
      return 'var(--spanish-gray)'
    }
    return routineColor ? routineColor : 'var(routine-red)'
  }

  return{
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    postion: 'relative',
    backgroundColor: 'var(--bs-dark)', 
    color: color(),
    borderColor: color(),
  }
} 

  return (
    <Accordion 
    className="routines-bank">

      {modalShow && 
      showConfirmDeleteRoutineModal()}
      
      {userRoutines && userRoutines.map(routine=>
        {return (
        <Card bg="dark" key={routine._id}>
          <Card.Header>
            <Accordion.Toggle
            disabled={editingMode}
            as={Button} 
            onClick={() => handleToggle(routine)}
            style={getToggleStyles(routineNamesColors[routine._id].color)} 
            eventKey={routine._id} >
              {routine.name}
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey={routine._id}>
            {crudingRoutine ? <DarkSpinner text={spinnerText[crudingRoutine]} /> :
            <Card.Body>

            <div 
            className='details-and-btns-container'
            style={{flexDirection: `${editingMode ? 'column' : 'row-reverse'}`}}>
              
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
                showExpandBtn={false}
                saveOnClick={handleSaveClick}
                discardOnClick={handleDiscardClick}
                />}

              </div>

              {!editingMode && !showSpinner &&  
              showDetails(routine)}

              {showSpinner && <DarkSpinner  style={{marginBottom: '50px', height: '300px'}} />}

              {editingMode && currentRoutine._id === routine._id && !crudingRoutine &&
              <CreateRoutineForm
              routine={routine} 
              discardBtn={true}
              handleSave={handleSaveClick}
              handleClose={() => setEditingMode(false)}
              showFinishLaterBtn={false}
              showHeader={false} />}
            </div>

            {!editingMode && 
            <Calendar
            isSingleRoutine={true}
            routine={routine}
            className='manage-routines-calendar' />   }   

            </Card.Body>}
          </Accordion.Collapse>
        </Card>)})}
      </Accordion>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id,
  userRoutines: state.routineReducer.userRoutines,
  currentRoutine: state.routineReducer.currentRoutine,
  crudingRoutine: state.routineReducer.crudingRoutine,
  routineNamesColors: state.routineReducer.routineNamesColors
})

const mapDispatchToProps = {
  clearCurrentRoutine,
  setCurrentRoutine,
  saveRoutineChanges,
  createNewRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesAccordion)
