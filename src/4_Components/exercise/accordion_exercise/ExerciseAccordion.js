import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {clearCurrentExercise, setCurrentExercise, saveExerciseChanges} from '../../../1_Actions/exerciseActions'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ToolTip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {TiEdit} from 'react-icons/ti'
import Calendar from '../../calendar/SingleRoutineCalendar'
import SaveDiscardExpandBtnGroup from '../../buttons/SaveDiscardExpandBtnGroup'
import CreateExerciseForm from '../form_exercise/ExerciseForm'
import DarkSpinner from '../../spinners/DarkSpinner'

export const ExercisesAccordion = ({
  userExercises, 
  history, 
  currentExercise,
  clearCurrentExercise, 
  setCurrentExercise,
  saveExerciseChanges,
  crudingExercise
}) => {

  const [editingMode, setEditingMode] = useState(false)
  const [showSpinner, setshowSpinner] = useState(false)


  useEffect(() => {
    if(crudingExercise === 'updating'){
      setshowSpinner(true)
    }
  }, [crudingExercise])

 
  if(showSpinner){
    setTimeout(() => {
      setshowSpinner(false)
    }, 800)
  }

  const handleSaveClick = () => {
    saveExerciseChanges(currentExercise._id, currentExercise)
    setEditingMode(false)
    clearCurrentExercise()
  }

  const handleDiscardClick = () => {
    setEditingMode(false)
    clearCurrentExercise()
  }

  const handleSameComponentEdit = (exercise) => {
    setCurrentExercise(exercise)
    setEditingMode(true)
  }

  const editInCreatePage = (exercise) => {
    //console.log({exercise})
    if(currentExercise._id !== exercise._id) setCurrentExercise(exercise)
    history.push('/create-exercise')
  }

  const handleToggle = () => {
    setEditingMode(false)
    clearCurrentExercise()
  }

  const showDetails = (exercise) => {
    return (
      <ul className='list-group'>
        <li><strong>Category:</strong> {exercise.category ? exercise.category : 'none chosen'}</li>
        <li><strong>Difficulty: </strong>{exercise.difficulty_scale ? exercise.difficulty_scale : 'none chosen'}</li>
        <li><strong>Muscle Group: </strong>{exercise.muscle_group ? exercise.muscle_group : 'none chosen'}</li>
        <li><strong>Body Part: </strong>{exercise.body_part ? exercise.body_part : 'none chosen'}</li>
        <li><strong>Target Muscle: </strong>{exercise.target_muscle ? exercise.target_muscle : 'none chosen'}</li>
        <li><strong>Description: </strong>
          {exercise.description ? <p>{exercise.description}</p> : <p>This exercise has no description yet.</p>}
        </li>
      </ul>  
    )
  }
  return (
    <Accordion defaultActiveKey={userExercises[0]._id} className="exercises-bank">
    {userExercises && userExercises.map(exercise=>
      {return (
      <Card bg="dark" key={exercise._id}>

        <Card.Header style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
          <Accordion.Toggle
          disabled={editingMode}
          as={Button} 
          onClick={handleToggle}
          style={{width: '100%', display: 'flex', justifyContent: 'center', postion: 'relative'}} 
          eventKey={exercise._id} >
            {exercise.name}
          </Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey={exercise._id}>
          <Card.Body>

          <div className='details-and-btns-container' style={{flexDirection: `${editingMode ? 'column' : 'row-reverse'}`}} >
            
            {crudingExercise && <DarkSpinner />}
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
              <TiEdit className='click-edit-btn cmd-btn' onClick={() => handleSameComponentEdit(exercise)} /> 
            </OverlayTrigger>}

            {editingMode && !showSpinner &&
            <SaveDiscardExpandBtnGroup
            saveOnClick={handleSaveClick}
            discardOnClick={handleDiscardClick}
            expandOnclick={() => editInCreatePage(exercise)}
            />}

            </div>

            {!editingMode && !showSpinner &&  showDetails(exercise)}
            {showSpinner && <DarkSpinner style={{marginBottom: '50px', height: '300px'}} />}

            {editingMode && currentExercise._id === exercise._id && !crudingExercise &&
            <CreateExerciseForm 
            discardBtn={false}
            saveBtn={false}
            finishLaterBtn={false}
            goToExerciseBank={false}
            continueEditingBtn={false}
            goToWeekBtn={false}
            showHeader={false} />}


          </div>
          {!editingMode && <Calendar calendarId='manage-exercises-calendar' />   }     
          </Card.Body>
        </Accordion.Collapse>
      </Card>)})}
    </Accordion>
  )
}

const mapStateToProps = (state) => ({
  userExercises: state.exerciseReducer.userExercises,
  currentExercise: state.exerciseReducer.currentExercise,
  crudingExercise: state.exerciseReducer.crudingExercise
})

const mapDispatchToProps = {
  clearCurrentExercise,
  setCurrentExercise,
  saveExerciseChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesAccordion)
