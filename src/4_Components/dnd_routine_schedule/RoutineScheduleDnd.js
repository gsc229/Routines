import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveWeekChanges, setCurrentWeek, setScheduleDnDSelectedWeekNumber, createNewWeek} from '../../1_Actions/weekActions'
import {saveManySetGroupChanges, saveSetGroupChanges} from '../../1_Actions/setGroupActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {syncWeeksAndSetGroups} from './schedule_helpers/syncWeeksAndSetGroups'
import {routineScheduleConstructor} from './schedule_helpers/routineScheduleConstructor'
import {onSetGroupDragEnd} from './schedule_helpers/onSetGroupDragEnd'
import {DragDropContext} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import Form from 'react-bootstrap/Form'
import DroppableDay from './DroppableDay'
import Button from 'react-bootstrap/Button'
import  ConfirmDeleteWeekModal from '../modals/confirm_delete_modals/ConfirmDeleteWeekModal'

export const RoutineScheduleDnd = ({
  userId,
  currentRoutine,
  currentWeeks,
  currentSetGroups,
  createNewWeek,
  currentRoutineSets,
  setCurrentWeek,
  saveSetGroupChanges,
  saveWeekChanges,
  saveManySetGroupChanges,
  crudingWeek,
  crudingSetGroup,
  setScheduleDnDSelectedWeekNumber,
  scheduleDnDSelectedWeekNumber
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})
  const [weekToDestroy, setWeekToDestroy] = useState('')
  const [modalShow, setModalShow] = useState(false)

  useEffect( async() => {
    await syncWeeksAndSetGroups(currentWeeks, currentSetGroups, saveWeekChanges, saveManySetGroupChanges)

  }, [])

  useEffect(() => {
    if(scheduleDnDSelectedWeekNumber === 'all'){
      setRoutineSchedule(routineScheduleConstructor(currentSetGroups, currentWeeks, currentRoutineSets))
    } else{
      const targetWeek = currentWeeks.filter(week=> week.week_number == scheduleDnDSelectedWeekNumber)
      setRoutineSchedule(routineScheduleConstructor(currentSetGroups, targetWeek, currentRoutineSets))
    }


  }, [currentWeeks, currentRoutineSets, scheduleDnDSelectedWeekNumber])

  const addWeek = async () => {
    const credentials = {
      user: userId,
      routine: currentRoutine._id,
      week_number: currentWeeks.length + 1
    }
    createNewWeek(credentials)
    setScheduleDnDSelectedWeekNumber(currentWeeks.length + 1)
  }

  return (
      <div 
      className='routine-schedule-dnd'>
      {modalShow && <ConfirmDeleteWeekModal setModalShow={setModalShow} modalShow={modalShow} />}
      {!currentSetGroups && <DarkSpinner />}
      {crudingWeek === 'creating-week' && <DarkSpinner text='Creating week...' />}
      {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
      {crudingWeek === 'updating-week' && <DarkSpinner text='Syncing Schedule...' />}
      {crudingSetGroup === 'updating-many-set-groups' && <DarkSpinner text='Syncing Schedule...' />}

      <Form className='week-selector'>  
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Choose Week</Form.Label>
          <Form.Control
          onChange={(e) => setScheduleDnDSelectedWeekNumber(e.target.value)}
          as="select">
            <option value='all'>All</option>
            {currentWeeks.map(week => 
            <option
            selected={week.week_number == scheduleDnDSelectedWeekNumber}
            value={week.week_number}
            key={week._id}>
              Week {week.week_number}
            </option>)}
          </Form.Control>
        </Form.Group>
        <Button
        className='add-week-btn' 
        onClick={addWeek}
        variant='primary'>Add Week</Button>
      </Form>


      {currentSetGroups && !crudingWeek && 
      <DragDropContext 
       onDragEnd={ result => onSetGroupDragEnd(result, routineSchedule, saveSetGroupChanges, setRoutineSchedule)}>
      {Object.entries(routineSchedule).map(([weekNumber, days]) => {
        return(
          <div
          key={`week-${weekNumber}`}
          className='week-container'>
            <div
            className='week-container-header'>
              <h5>{currentRoutine.name} - Week: {routineSchedule[weekNumber].week_number}</h5>
              <Button 
              onClick={() =>{ 
              setModalShow(true)
              setCurrentWeek(currentWeeks.find(week => week._id === routineSchedule[weekNumber]._id))
              }}>
                Delete Week
              </Button>
            </div>
                <div
                className='week-container-row'>
                {Object.entries(routineSchedule[weekNumber]).map(([dayNumber, name]) => {
                  return dayNumber !== "_id" && dayNumber !== "week_number" && (
                    <DroppableDay 
                    key={weekNumber+dayNumber}
                    routineSchedule={routineSchedule}
                    setCurrentWeek={setCurrentWeek}
                    currentRoutine={currentRoutine}
                    name={name}
                    weekNumber={weekNumber}
                    dayNumber={dayNumber}/>
                  )
                })}
              </div>
          </div>
        
        )})}
        </DragDropContext>}
        <Button
        className='add-week-btn' 
        onClick={addWeek}
        variant='primary'>Add Week</Button>
      </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id,
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks,
  scheduleDnDSelectedWeekNumber: state.weekReducer.scheduleDnDSelectedWeekNumber,
  currentSetGroups: state.setGroupReducer.currentSetGroups,
  currentRoutineSets: state.exerciseSetReducer.currentRoutineSets,
  error_message: state.weekReducer.error_message,
  crudingWeek: state.weekReducer.crudingWeek,
  crudingSetGroup: state.setGroupReducer.crudingSetGroup
})

const mapDispatchToProps = {
  createNewWeek,
  setCurrentWeek,
  saveSetGroupChanges,
  saveWeekChanges,
  saveManySetGroupChanges,
  clearErrorMessage,
  setScheduleDnDSelectedWeekNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScheduleDnd)
