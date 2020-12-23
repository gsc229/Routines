import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {createNewExercise, clearCurrentExercise, saveExerciseChanges, writingExercise} from '../../1_Actions/exerciseActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {majorMuscleGroups, categories} from '../form_routine/routineFormData'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import SaveBtn from '../buttons/SaveBtn'
import DiscardBtn from '../buttons/DiscardBtn'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export const ExerciseForm = ({ 
  currentExercise,
  currentExerciseName, 
  writingExercise, 
  error_message, 
  unsavedChanges,
  clearErrorMessage, 
  createNewExercise, 
  saveExerciseChanges,
  userId,
  showHeader=true,
  disguardBtn=true,
  saveBtn=true,
  goToWeekBtn=true,
  finishLaterBtn=true,
  continueEditingBtn=true,
  goToExerciseBank=true
}) => {


  const {name, category, muscle_group, target_muscle, description, difficulty_scale} = currentExercise
  const history = useHistory()
  const handleChange = e => {
    writingExercise(e.target.name, e.target.value)
  }

  useEffect(()=> {
    if(error_message){
    setTimeout(() => clearErrorMessage(),4000)
    }
  }, [error_message])

  // Handles logic to distinguish the need of POST vs PUT requests of the currentExercise
  // What distinguishes an unsaved-on-the-backend-exercise from a saved one will be the _id (or lack thereof)
  const handleCreateOrEdit = async (path) => {
    // after the update or save, redirect will depend on whether eiditing old or createing new exercise and user input. 
    const getRedirect = (userId) => {
      const redirects = {
        manageExercises: '/manage-exercises',
        createContinue: `/editing-exercise/${userId}/create-week`,
        updateContinue: `/editing-exercise/${userId}/weeks`
      }

      return redirects[path]

    }

    if(!currentExercise.original_creator){
      const success = await createNewExercise({...currentExercise, original_creator: userId, user: userId})
      console.log({success})
      if(success){
       path && history.push(getRedirect(currentExercise._id))
      }
    }else if(!currentExercise.user){
      const success = await createNewExercise({...currentExercise, user: userId})
      console.log({success})
      if(success){
       path && history.push(getRedirect(currentExercise._id))
      }
    } else{
      console.log('About to send this: ', {currentExercise})
      const success = await saveExerciseChanges(currentExercise._id, currentExercise)
      console.log({success})
      if(success){
       path && history.push(getRedirect(currentExercise._id))
      }
    }
  }

  const handleDisguard = () => {
    clearCurrentExercise()
    history.push('/manage-exercises')
  }

  const getHeader = () => {
  if(currentExercise._id ) return <h2>Currently Editing: {currentExerciseName}</h2> 
  if(!currentExercise._id) return <h2>Basic Exercise Info:</h2>
  }


  return (
    <Form>
        
        {showHeader && getHeader()}
        <Form.Group controlId="completeExerciseForm.Name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleChange} name="name" value={name} type="text" placeholder="Required" />
        </Form.Group>
        
        <Form.Group controlId="completeExerciseForm.Category">
          <Form.Label>Category</Form.Label>
          <Form.Control placeholder="- select -" onChange={handleChange} name="category" value={category} as="select">
            <option value="">none</option>
            {categories.map( category => <option key={category} value={category}>{category}</option>)}
          </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="completeExerciseForm.DifficultyScale">
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
        
        <Form.Group controlId="completeExerciseForm.MuslceGroup">
          <Form.Label>Major Muscle Group</Form.Label>
          <Form.Control placeholder="- select -"onChange={handleChange} name="muscle_group" value={muscle_group} as="select">
            <option value="">none</option>
            {majorMuscleGroups.map(group => <option key={group} value={group}>{group}</option>)}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="completeExerciseForm.TargetMuslce">
          <Form.Label>Target Muscle</Form.Label>
          <Form.Control onChange={handleChange} name="target_muscle" value={target_muscle} type="text" placeholder="Any particular muscle?" />
        </Form.Group>

        <Form.Group controlId="completeExerciseForm.Description">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={handleChange} name="description" value={description} as="textarea" placeholder="More about your exercise..." rows={3} />
        </Form.Group>


        <ButtonToolbar>
          <ButtonGroup className="mr-2 mt-2">
           {disguardBtn && <DiscardBtn onClick={handleDisguard} styles={{fontWeight: "600", color: 'white'}}/>}
          </ButtonGroup>
          <ButtonGroup className="mt-2">
            {saveBtn && <SaveBtn style={{textAlign: 'center'}} className='mr-1'  onClick={() => handleCreateOrEdit()} text=" Save"/>}
            
            
          </ButtonGroup>
          <p>TODO: Turn these into a modal that pops up after save</p>
          <ButtonGroup className="mt-2">
            {finishLaterBtn && <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('manageExercises')} text=" Save and Finish Later" Icon="" />}
            {!unsavedChanges && goToWeekBtn && <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('')} text=" Go to Weeks" Icon="" />}
            {!unsavedChanges && goToExerciseBank && <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('')} text=" Exercise Bank" Icon="" />}
            {!unsavedChanges && continueEditingBtn && <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('')} text=" Continue Editing" Icon="" />}
          </ButtonGroup>
        </ButtonToolbar>
        <br></br>
        <br/>
        <pre style={{color: 'white'}}>{JSON.stringify({error_message, currentExerciseName, unsavedChanges, userId, currentExercise,}, null, 2)}</pre>
      </Form>
  )
}

const mapStateToProps = (state) => ({
  currentExercise: state.exerciseReducer.currentExercise,
  currentExerciseName: state.exerciseReducer.currentExerciseName,
  error_message: state.exerciseReducer.error_message,
  unsavedChanges: state.exerciseReducer.unsavedChanges,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  writingExercise,
  clearErrorMessage,
  createNewExercise,
  saveExerciseChanges,
  clearCurrentExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm)
