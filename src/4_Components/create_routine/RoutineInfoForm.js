import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {majorMuscleGroups, categories} from './routineFormData'
import {writingRoutine, createNewRoutine, editRoutine, clearCurrentRoutine} from '../../1_Actions/routineActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import SaveBtn from '../buttons/SaveBtn'
import DiscardBtn from '../buttons/DiscardBtn'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export const RoutineInfoForm = ({ 
  currentRoutine,
  currentRoutineName, 
  writingRoutine, 
  error_message, 
  clearErrorMessage, 
  createNewRoutine, 
  userId
}) => {


  const {name, category, muscle_group, target_muscle, description, difficulty_scale} = currentRoutine
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
    const getRedirect = (userId) => {
      const redirects = {
        manageRoutines: '/manage-routines',
        createContinue: `/editing-routine/${userId}/create-week`,
        updateContinue: `/editing-routine/${userId}/weeks`
      }

      return redirects[path]

    }

    if(!currentRoutine.original_creator){
      const success = await createNewRoutine({...currentRoutine, original_creator: userId, user: userId})
      console.log({success})
      if(success){
       path && history.push(getRedirect(currentRoutine._id))
      }
    }else if(!currentRoutine.user){
      const success = await createNewRoutine({...currentRoutine, user: userId})
      console.log({success})
      if(success){
       path && history.push(getRedirect(currentRoutine._id))
      }
    } else{
      const success = await editRoutine(currentRoutine)
      console.log({success})
      if(success){
       path && history.push(getRedirect(currentRoutine._id))
      }
    }
  }

  const handleDisguard = () => {
    clearCurrentRoutine()
    history.push('/manage-routines')
  }

  return (
    <Form>
        {currentRoutine._id ? <h2>Currently Editing: {currentRoutineName}</h2> : <h2>Basic Routine Info:</h2>}
        
        <Form.Group controlId="completeRoutineForm.Name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleChange} name="name" value={name} type="text" placeholder="Required" />
        </Form.Group>
        
        <Form.Group controlId="completeRoutineForm.Category">
          <Form.Label>Category</Form.Label>
          <Form.Control placeholder="- select -" onChange={handleChange} name="category" value={category} as="select">
            <option value="">none</option>
            {categories.map( category => <option key={category} value={category}>{category}</option>)}
          </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="completeRoutineForm.DifficultyScale">
          <Form.Label>Difficulty Range {difficulty_scale}</Form.Label>
          <Form.Control onChange={handleChange} name="difficulty_scale" defaultValue={0} name="difficulty_scale" value={difficulty_scale} type="range" min={0} max={10} />
        </Form.Group>
        
        <Form.Group controlId="completeRoutineForm.MuslceGroup">
          <Form.Label>Major Muscle Group</Form.Label>
          <Form.Control placeholder="- select -"onChange={handleChange} name="muscle_group" value={muscle_group} as="select">
            <option value="">none</option>
            {majorMuscleGroups.map( group => <option key={group} value={group}>{group}</option>)}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="completeRoutineForm.TargetMuslce">
          <Form.Label>Target Muscle</Form.Label>
          <Form.Control onChange={handleChange} name="target_muscle" value={target_muscle} type="text" placeholder="Any particular muscle?" />
        </Form.Group>

        <Form.Group controlId="completeRoutineForm.Description">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={handleChange} name="description" value={description} as="textarea" placeholder="More about your routine..." rows={3} />
        </Form.Group>


        <ButtonToolbar>
          <ButtonGroup className="mr-2 mt-2">
            <DiscardBtn onClick={handleDisguard} styles={{fontWeight: "600"}} />
          </ButtonGroup>
          <ButtonGroup className="mt-2">
            <SaveBtn style={{textAlign: 'center'}} className='mr-1'  onClick={() => handleCreateOrEdit('manageRoutines')} text=" Save"/>
            <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('createContinue')} text=" Save and Continue" Icon="" />
            <SaveBtn onClick={() => handleCreateOrEdit('manageRoutines')} text=" Save and Finishe Later" Icon="" />
          </ButtonGroup>
        </ButtonToolbar>


        <br></br>
        <br/>
        <pre>{JSON.stringify({error_message, userId, currentRoutine}, null, 2)}</pre>
      </Form>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine,
  currentRoutineName: state.routineReducer.currentRoutineName,
  error_message: state.routineReducer.error_message,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  writingRoutine,
  clearErrorMessage,
  createNewRoutine,
  clearCurrentRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineInfoForm)
