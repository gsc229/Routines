import React from 'react'
import { connect } from 'react-redux'
import {majorMuscleGroups, categories} from './routineFormData'
import {writingRoutine} from '../../1_Actions/routineActions'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import SaveBtn from '../buttons/SaveBtn'

export const CreateRoutineCompleteForm = ({currentRoutine, writingRoutine}) => {

  let {difficulty_scale} = currentRoutine
  const handleChange = e => {
    writingRoutine(e.target.name, e.target.value)
  }


  return (
    <Form>
        <h2>Basic Routine Info:</h2>
        <Form.Group controlId="completeRoutineForm.Name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleChange} name="name" type="text" placeholder="Required" />
        </Form.Group>
        <Form.Group controlId="completeRoutineForm.Category">
          <Form.Label>Category</Form.Label>
          <Form.Control placeholder="- select -" onChange={handleChange} name="category" as="select">
            <option defaultValue >- select -</option>
            {categories.map( category => <option key={category}>{category}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="completeRoutineForm.DifficultyScale">
          <Form.Label>Difficulty Range {difficulty_scale}</Form.Label>
          <Form.Control onChange={handleChange} name="difficulty_scale" defaultValue={0} name="difficulty_scale" type="range" min={0} max={10} />
        </Form.Group>
        <Form.Group controlId="completeRoutineForm.MuslceGroup">
          <Form.Label>Major Muscle Group</Form.Label>
          <Form.Control placeholder="- select -"onChange={handleChange} name="muscle_group" as="select">
            <option defaultValue >- select -</option>
            {majorMuscleGroups.map( group => <option key={group}>{group}</option>)}
          </Form.Control>
        <Form.Group controlId="completeRoutineForm.TargetMuslce">
          <Form.Label>Target Muscle</Form.Label>
          <Form.Control onChange={handleChange} name="target_muscle" type="text" placeholder="Any particular muscle?" />
        </Form.Group>
        </Form.Group>
        <Form.Group controlId="completeRoutineForm.Description">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={handleChange} name="description" as="textarea" placeholder="More about your routine..." rows={3} />
        </Form.Group>
        <ButtonGroup>
          <SaveBtn text=" Save and Continue" />
        </ButtonGroup>
        <br></br>
        {JSON.stringify(currentRoutine)}
      </Form>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  writingRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoutineCompleteForm)
