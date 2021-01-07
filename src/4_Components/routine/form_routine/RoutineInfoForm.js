import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {majorMuscleGroups, categories} from './routineFormData'
import {writingRoutine, createNewRoutine, saveRoutineChanges, clearCurrentRoutine, fetchFlattenedRoutine} from '../../../1_Actions/routineActions'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import SaveBtn from '../../buttons/SaveBtn'
import DiscardBtn from '../../buttons/DiscardBtn'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

export const RoutineInfoForm = ({ 
  currentRoutine,
  currentRoutineName, 
  writingRoutine, 
  error_message, 
  unsavedChanges,
  clearErrorMessage, 
  createNewRoutine, 
  saveRoutineChanges,
  userId,
  showHeader=true,
  showDiscardBtn=true,
  discardCallback,
  showSaveBtn=true,
  showGoToWeekBtn=true,
  showGoToRoutinesBtn=true,
  showGoToExerciseBank=true,
  fetchFlattenedRoutine
}) => {


  const {name, category, muscle_group, target_muscle, description, difficulty_scale, start_date, end_date} = currentRoutine
  
  const history = useHistory()
  const handleChange = e => {
    writingRoutine(e.target.name, e.target.value)
  }

  useEffect(()=> {
    if(error_message){
    setTimeout(() => clearErrorMessage(),4000)
    }
  }, [error_message])

  // Handles logic to distinguish the need of POST vs PUT requests of the currentRoutine
  // What distinguishes an unsaved-on-the-backend-routine from a saved one will be the _id (or lack thereof)
  const handleCreateOrEdit = async (path) => {
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
      fetchFlattenedRoutine(response.data._id)
    }
    
  }

  const handleDiscard = () => {
    clearCurrentRoutine()
    history.push('/manage-routines')
  }

  const handleMangeScheduleClick = () => {
    if(currentRoutine._id){
      fetchFlattenedRoutine(currentRoutine._id)
      history.push(`/view-routine/${currentRoutine._id}/full-body-strength-training`)
    }
  }

  const getHeader = () => {
  if(currentRoutine._id ) return <h3>Currently Editing: {currentRoutineName}</h3> 
  if(!currentRoutine._id) return <h3>Basic Routine Info:</h3>
  }

  return (
    <Form className='routine-form'>      
      {showHeader && getHeader()}
      {error_message && 
      <Alert
      className='name-alert' 
      variant='danger'>
        {error_message}
      </Alert>}
      <Row>
        <Col sm='12' md='6'>
          <Form.Group controlId="completeRoutineForm.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control 
            onChange={handleChange} 
            name="name" 
            value={name} 
            type="text" 
            placeholder="Required" />
          </Form.Group>
        </Col>
        
        <Col sm='12' md='6'>
          <Form.Group controlId="completeRoutineForm.Category">
            <Form.Label>Category</Form.Label>
            <Form.Control 
            placeholder="- select -" 
            onChange={handleChange} 
            name="category" 
            value={category} as="select">
              <option value="">optional - choose -</option>
              {categories
              .map( category => <option key={category} value={category}>{category}</option>)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      
      <Row>
        <Col sm='12' md='6'>
          <Form.Group  
          className='difficulty-slider-label-form-group'
          controlId="completeRoutineForm.DifficultyScale">
            <Form.Label 
            className='difficulty-range-label'>
              Difficulty Range 
              <span>
                {difficulty_scale ? difficulty_scale : 0}
              </span>
            </Form.Label>
            <Form.Control
            onChange={handleChange}
            className='difficulty-slider'
            name="difficulty_scale" 
            defaultValue={0} 
            name="difficulty_scale" 
            value={difficulty_scale ? difficulty_scale : 0} 
            type="range"
            custom
            min={0} 
            max={10} />
              
          </Form.Group>
        </Col>
        
        <Col sm='12' md='6'>
          <Form.Group controlId="completeRoutineForm.MuslceGroup">
            <Form.Label>Major Muscle Group</Form.Label>
            <Form.Control 
            placeholder="- select -"
            onChange={handleChange} 
            name="muscle_group" 
            value={muscle_group} 
            as="select">
              <option value="">optional - choose -</option>
              {majorMuscleGroups.map(group => <option key={group} value={group}>{group}</option>)}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col sm='12' md='6'>
          <Form.Group controlId="completeRoutineForm.TargetMuslce">
            <Form.Label>Target Muscle</Form.Label>
            <Form.Control 
            onChange={handleChange} 
            name="target_muscle" 
            value={target_muscle} 
            type="text" 
            placeholder="Any particular muscle?" />
          </Form.Group>
        </Col>
  
        <Col sm='12' md='6'>
          <Form.Group controlId="completeRoutineForm.StartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control 
            onChange={handleChange} 
            name="start_date" 
            value={start_date} 
            type="date"/>
          </Form.Group>
        </Col>
      </Row>

      
      <Form.Group controlId="completeRoutineForm.Description">
        <Form.Label>Description</Form.Label>
        <Form.Control 
        onChange={handleChange} 
        name="description" 
        value={description} 
        as="textarea" 
        placeholder="More about your routine..." 
        rows={3} />
      </Form.Group>


      <ButtonToolbar>
        <ButtonGroup className="mr-2 mt-2">
          {showDiscardBtn && 
          <DiscardBtn 
          className='routine-form-btn discard-routine-btn' 
          onClick={discardCallback ? discardCallback : handleDiscard} />}
          {showSaveBtn && 
          <SaveBtn 
          className=' routine-form-btn save-routine-btn'  
          onClick={() => handleCreateOrEdit()} 
          text=" Save"/>}
        </ButtonGroup>
        {currentRoutine._id &&
        <ButtonGroup className="mr-2 mt-2">
          <Button onClick={handleMangeScheduleClick}>Manage Weeks</Button>
        </ButtonGroup>}
      </ButtonToolbar>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine,
  currentRoutineName: state.routineReducer.currentRoutineName,
  error_message: state.routineReducer.error_message,
  unsavedChanges: state.routineReducer.unsavedChanges,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  writingRoutine,
  clearErrorMessage,
  createNewRoutine,
  saveRoutineChanges,
  clearCurrentRoutine,
  fetchFlattenedRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineInfoForm)
