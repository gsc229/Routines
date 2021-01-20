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
import WeekHeader from './WeekHeader'

export const RoutineScheduleDnd = ({
  userId,
  currentRoutine,
  currentWeeks,
  currentRoutineSetGroups,
  createNewWeek,
  currentRoutineSets,
  setCurrentWeek,
  saveSetGroupChanges,
  saveWeekChanges,
  saveManySetGroupChanges,
  crudingWeek,
  crudingSetGroup,
  crudingExerciseSet,
  setScheduleDnDSelectedWeekNumber,
  scheduleDnDSelectedWeekNumber
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})
  const [weekToDestroy, setWeekToDestroy] = useState('')
  const [modalShow, setModalShow] = useState(false)

  
  const bulkWrting = () => {
    if(crudingWeek === 'bulk-writing-weeks'){
      return 'Week'
    }
    if(crudingSetGroup === 'bulk-writing-set-groups'){
      return 'Set Group'
    } 
    if(crudingExerciseSet === 'bulk-writing-exercise-sets'){
      return 'Set'
    }

    return false
  } 

  const isCruding = crudingWeek || crudingExerciseSet || crudingExerciseSet

  useEffect( async() => {
    await syncWeeksAndSetGroups(currentWeeks, currentRoutineSetGroups, saveWeekChanges, saveManySetGroupChanges)

  }, [])

  useEffect(() => {
    if(scheduleDnDSelectedWeekNumber === 'all'){
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, currentWeeks, currentRoutineSets))
    } else{
      const targetWeek = currentWeeks.filter(week=> week.week_number == scheduleDnDSelectedWeekNumber)
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, targetWeek, currentRoutineSets))
    }

  }, [currentWeeks, currentRoutineSets, scheduleDnDSelectedWeekNumber, currentRoutineSetGroups])

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
      </Form>
      
      {modalShow && <ConfirmDeleteWeekModal setModalShow={setModalShow} modalShow={modalShow} />}
      {!currentRoutineSetGroups && <DarkSpinner />}
      {crudingWeek === 'creating-week' && <DarkSpinner text='Creating week...' />}
      {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
      {crudingWeek === 'updating-week' && <DarkSpinner text='Syncing Schedule...' />}
      {crudingSetGroup === 'updating-many-set-groups' && <DarkSpinner text='Syncing Schedule...' />}
      {bulkWrting() && <DarkSpinner text={`Saving ${bulkWrting()} Changes...`} />}
      


      {currentRoutineSetGroups && !crudingWeek && !bulkWrting() &&
      <DragDropContext 
       onDragEnd={ result => onSetGroupDragEnd(result, routineSchedule, saveSetGroupChanges, setRoutineSchedule)}>
      {Object.entries(routineSchedule).map(([weekNumber, days]) => {
        return(
          <div
          key={`week-${weekNumber}`}
          className='week-container'>

            <WeekHeader 
            setModalShow={setModalShow}
            routineSchedule={routineSchedule} 
            weekNumber={weekNumber} />

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
      </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id,
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks,
  scheduleDnDSelectedWeekNumber: state.weekReducer.scheduleDnDSelectedWeekNumber,
  currentRoutineSetGroups: state.setGroupReducer.currentRoutineSetGroups,
  currentRoutineSets: state.exerciseSetReducer.currentRoutineSets,
  error_message: state.weekReducer.error_message,
  crudingWeek: state.weekReducer.crudingWeek,
  crudingSetGroup: state.setGroupReducer.crudingSetGroup,
  crudingExerciseSet: state.exerciseSetReducer.crudingExerciseSet
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
