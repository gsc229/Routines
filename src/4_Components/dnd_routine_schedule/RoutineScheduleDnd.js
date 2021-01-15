import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {destroyWeek, saveWeekChanges, setCurrentWeek} from '../../1_Actions/weekActions'
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
  currentRoutine,
  currentWeeks,
  currentSetGroups,
  currentRoutineSets,
  destroyWeek,
  setCurrentWeek,
  saveSetGroupChanges,
  saveWeekChanges,
  saveManySetGroupChanges,
  error_message,
  crudingWeek,
  crudingSetGroup,
  clearErrorMessage
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})
  const [weekToDestroy, setWeekToDestroy] = useState('')
  const [modalShow, setModalShow] = useState(false)

  useEffect( async() => {
    await syncWeeksAndSetGroups(currentWeeks, currentSetGroups, saveWeekChanges, saveManySetGroupChanges)
    setRoutineSchedule(routineScheduleConstructor(currentSetGroups, currentWeeks, currentRoutineSets))

  }, [currentWeeks, currentRoutineSets, currentWeeks])

  

  const handleWeekChange = (e) => {
    if(e.target.value === 'all'){
      //setSelectedWeek(routineSchedule)
      setRoutineSchedule(routineScheduleConstructor(currentSetGroups, currentWeeks, currentRoutineSets))
    } else{
      const targetWeek = currentWeeks.filter(week=> week.week_number == e.target.value)
      console.log({targetWeek, number: e.target.value})
      setRoutineSchedule(routineScheduleConstructor(currentSetGroups, targetWeek, currentRoutineSets))
      //setSelectedWeek({[e.target.value]: routineSchedule[e.target.value]})
    }
  }

  return (
      <div 
      className='routine-schedule-dnd'>
      {modalShow && <ConfirmDeleteWeekModal week={weekToDestroy} setModalShow={setModalShow} modalShow={modalShow} />}
      {!currentSetGroups && <DarkSpinner />}
      {crudingWeek === 'creating-week' && <DarkSpinner text='Creating week...' />}
      {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
      {crudingWeek === 'updating-week' && <DarkSpinner text='Syncing Schedule...' />}
      {crudingSetGroup === 'updating-many-set-groups' && <DarkSpinner text='Syncing Schedule...' />}

      <Form className='week-selector'>  
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Choose Week</Form.Label>
          <Form.Control
          defaultValue='all' 
          onChange={handleWeekChange}
          as="select">
            <option value='all'>All</option>
            {currentWeeks.map(week => 
            <option
            value={week.week_number}
            key={week._id}>
              Week {week.week_number}
            </option>)}
          </Form.Control>
        </Form.Group>
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
              setWeekToDestroy(routineSchedule[weekNumber])
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
      </div>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks,
  currentSetGroups: state.setGroupReducer.currentSetGroups,
  currentRoutineSets: state.exerciseSetReducer.currentRoutineSets,
  error_message: state.weekReducer.error_message,
  crudingWeek: state.weekReducer.crudingWeek,
  crudingSetGroup: state.setGroupReducer.crudingSetGroup
})

const mapDispatchToProps = {
  destroyWeek,
  setCurrentWeek,
  saveSetGroupChanges,
  saveWeekChanges,
  saveManySetGroupChanges,
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScheduleDnd)
