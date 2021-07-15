import React from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {createNewExercise, clearCurrentExercise, saveExerciseChanges, localWritingExercise, destroyExercise} from '../../../1_Actions/exerciseActions'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import {majorMuscleGroups, categories} from '../../manage_routines/form_routine/routineFormData'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import SaveBtn from '../../buttons/SaveBtn'
import DiscardBtn from '../../buttons/DiscardBtn'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import EmbedAccordion from '../accordion_embed_instruction/EmbedAccordion'
import IFramePreview from './IFramePreview'
import Button from 'react-bootstrap/Button'

export const ExerciseForm = ({ 
  currentExercise,
  currentExerciseName, 
  localWritingExercise, 
  createNewExercise,
  destroyExercise,
  saveExerciseChanges,
  userId,
  showHeader=true,
  discardBtn=true,
  saveBtn=true,
}) => {

   /* 
  <img src="https://images.ctfassets.net/cnu0m8re1exe/1GxSYi0mQSp9xJ5svaWkVO/d151a93af61918c234c3049e0d6393e1/93347270_cat-1151519_1280.jpg?w=650&h=433&fit=fill" />
  */
 /* 
<iframe width="560" height="315" src="https://www.youtube.com/embed/vthMCtgVtFw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/
  const {name, category, muscle_group, target_muscle, description, difficulty_scale, video_url} = currentExercise
  
  const history = useHistory()

  const handleChange = (e, trim=true) => {
    const trimmeddValue = trim ? e.target.value.trim() : e.target.value 

    localWritingExercise(e.target.name, trimmeddValue)
  }

  

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
    } else{
      console.log('About to send this: ', {currentExercise})
      const success = await saveExerciseChanges(currentExercise._id, {...currentExercise, user: userId})
      console.log({success})
      if(success){
       path && history.push(getRedirect(currentExercise._id))
      }
    }
  }

  const video_url_placeholder = `Want to have a video handy for how to perform an exercise correctly? Embed a YouTube video with an iframe.
  Click red dropdown link below for detailed instructions.`
   
  const handleDiscard = () => {
    clearCurrentExercise()
    history.push('/manage-exercises')
  }

  const getHeader = () => {
    if(currentExercise._id ) return <h2>Currently Editing: {currentExerciseName}</h2> 
    if(!currentExercise._id) return <h2>Basic Exercise Info:</h2>
  }

  const handleDeleteExercise = async() => {
    await destroyExercise(currentExercise._id)
    history.push('/manage-exercises')
  }


  return (
    <Form
    className='exercise-form'>
      {showHeader && getHeader()}
      <Form.Group controlId="completeExerciseForm.Name">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={(e) => handleChange(e, false)} name="name" value={name} type="text" placeholder="Required" />
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
        <Form.Control onChange={(e) => handleChange(e, false)} name="target_muscle" value={target_muscle} type="text" placeholder="Any particular muscle?" />
      </Form.Group>

      <Form.Group controlId="completeExerciseForm.Description">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={(e) => handleChange(e, false)} name="description" value={description} as="textarea" placeholder="More about your exercise..." rows={3} />
      </Form.Group>

      <Form.Group controlId="completeExerciseForm.VideoUrl">
          <Form.Label>
            Embed YouTube or other Video with iframe: 
          </Form.Label>
        <Form.Control onChange={handleChange} name="video_url" value={video_url} as="textarea" placeholder={video_url_placeholder} rows={4} />
        <IFramePreview width='30%' iframeString={video_url} />
        <EmbedAccordion />
      </Form.Group>

      

      <ButtonToolbar>
        <ButtonGroup className="mr-2 mt-2">
          {discardBtn && 
          <DiscardBtn onClick={handleDiscard} styles={{fontWeight: "600", color: 'white'}}/>}
        </ButtonGroup>

        <ButtonGroup className="mt-2">
          {saveBtn && 
          <SaveBtn style={{textAlign: 'center'}} className='mr-1'  onClick={() => handleCreateOrEdit('manageExercises')} text=" Save"/>}
          {currentExercise._id && 
          <Button onClick={handleDeleteExercise}>DELETE EXERCISE</Button>}
        </ButtonGroup>


        
        
        
        {/* <ButtonGroup className="mt-2">
          {finishLaterBtn && 
          <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('manageExercises')} text=" Save and Finish Later" Icon="" />}
          {!unsavedChanges && goToWeekBtn && 
          <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('')} text=" Go to Weeks" Icon="" />}
          {!unsavedChanges && goToExerciseBank && 
          <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('')} text=" Exercise Bank" Icon="" />}
          {!unsavedChanges && continueEditingBtn && 
          <SaveBtn className='mr-1' onClick={() => handleCreateOrEdit('')} text=" Continue Editing" Icon="" />}
        </ButtonGroup> */}
      </ButtonToolbar>
      <br></br>
      <br/>
      {/* <pre style={{color: 'white'}}>{JSON.stringify({error_message, currentExerciseName, unsavedChanges, userId, currentExercise}, null, 2)}</pre> */}
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
  localWritingExercise,
  clearErrorMessage,
  createNewExercise,
  saveExerciseChanges,
  clearCurrentExercise,
  destroyExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm)
