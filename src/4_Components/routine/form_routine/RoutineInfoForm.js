import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {majorMuscleGroups, categories} from './routineFormData'
import {writingRoutine, createNewRoutine, saveRoutineChanges, clearCurrentRoutine} from '../../../1_Actions/routineActions'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import SaveBtn from '../../buttons/SaveBtn'
import DiscardBtn from '../../buttons/DiscardBtn'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Alert from 'react-bootstrap/Alert'

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
  showGoToExerciseBank=true
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
    const getRedirect = () => {
      const redirects = {
        manageRoutines: '/manage-routines',
        createContinueWeek: `/editing-routine/${currentRoutine.slug}/create-week`,
        updateContinueWeek: `/editing-routine/${currentRoutine.slug}/weeks`
      }

      return redirects[path]

    }

    if(!currentRoutine.original_creator){
      const success = await createNewRoutine({...currentRoutine, original_creator: userId, user: userId})
      if(success){
       path && history.push(getRedirect(currentRoutine._id))
      }
    }else if(!currentRoutine.user){
      const success = await createNewRoutine({...currentRoutine, user: userId})
      if(success){
       path && history.push(getRedirect(currentRoutine._id))
      }
    } else{
      const success = await saveRoutineChanges(currentRoutine._id, currentRoutine)
      if(success){
       path && history.push(getRedirect(currentRoutine._id))
      }
    }
  }

  const handleDiscard = () => {
    clearCurrentRoutine()
    history.push('/manage-routines')
  }

  const getHeader = () => {
  if(currentRoutine._id ) return <h3>Currently Editing: {currentRoutineName}</h3> 
  if(!currentRoutine._id) return <h3>Basic Routine Info:</h3>
  }


  return (
    <Form className='routine-form'>
      {showHeader && getHeader()}
      <Form.Group controlId="completeRoutineForm.Name">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={handleChange} name="name" value={name} type="text" placeholder="Required" />
        {error_message && <Alert style={{marginTop: '10px'}} variant='danger'>{error_message}</Alert>}
      </Form.Group>
      
      <Form.Group controlId="completeRoutineForm.Category">
        <Form.Label>Category</Form.Label>
        <Form.Control placeholder="- select -" onChange={handleChange} name="category" value={category} as="select">
          <option value="">- choose -</option>
          {categories.map( category => <option key={category} value={category}>{category}</option>)}
        </Form.Control>
      </Form.Group>
      
      <Form.Group controlId="completeRoutineForm.DifficultyScale">
        <Form.Label style={{width: '100%'}}>
        <Container>
          <Row>
            <Col style={{paddingLeft: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} md='4'>Difficulty Range 
              <span style={{textAlign: 'right' , fontSize: '20px', fontWeight: 'bold'}}>{difficulty_scale ? difficulty_scale : 0}</span>
            </Col>     
          </Row>
        </Container>
        </Form.Label>
        
        <Container>
          <Row>
            <Col md='4' style={{paddingLeft: 0}}>
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
            </Col>
          </Row>
        </Container>
      </Form.Group>
      
      <Form.Group controlId="completeRoutineForm.MuslceGroup">
        <Form.Label>Major Muscle Group</Form.Label>
        <Form.Control placeholder="- select -"onChange={handleChange} name="muscle_group" value={muscle_group} as="select">
          <option value="">- choose -</option>
          {majorMuscleGroups.map(group => <option key={group} value={group}>{group}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="completeRoutineForm.TargetMuslce">
        <Form.Label>Target Muscle</Form.Label>
        <Form.Control onChange={handleChange} name="target_muscle" value={target_muscle} type="text" placeholder="Any particular muscle?" />
      </Form.Group>

      <Form.Group controlId="completeRoutineForm.StartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control onChange={handleChange} name="start_date" value={start_date} type="date"/>
      </Form.Group>

      
      <Form.Group controlId="completeRoutineForm.Description">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={handleChange} name="description" value={description} as="textarea" placeholder="More about your routine..." rows={3} />
      </Form.Group>


      <ButtonToolbar>

        <ButtonGroup className="mr-2 mt-2">
          {showDiscardBtn && 
          <DiscardBtn className='routine-form-btn discard-routine-btn' onClick={discardCallback ? discardCallback : handleDiscard} styles={{fontWeight: "600"}} />}
        </ButtonGroup>
        
        <ButtonGroup className="mt-2">
          {showSaveBtn && 
          <SaveBtn style={{textAlign: 'center'}} className=' routine-form-btn save-routine-btn'  onClick={() => handleCreateOrEdit()} text=" Save"/>}
          {showGoToRoutinesBtn && 
          <SaveBtn className=' routine-form-btn' onClick={() => handleCreateOrEdit('manageRoutines')} text=" Go to Routines" />}
          {showGoToWeekBtn && 
          <SaveBtn className=' routine-form-btn' onClick={() => handleCreateOrEdit('createContinueWeek')} text=" Go to Weeks" />}
          {!unsavedChanges && showGoToExerciseBank && 
          <SaveBtn className=' routine-form-btn' onClick={() => handleCreateOrEdit('')} text="Go Exercise Bank" />}
        </ButtonGroup>

      </ButtonToolbar>
        {/* <br></br>
        <br/>
        <pre>{JSON.stringify({error_message, currentRoutineName, unsavedChanges, userId, currentRoutine,}, null, 2)}</pre> */}
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
  clearCurrentRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineInfoForm)
