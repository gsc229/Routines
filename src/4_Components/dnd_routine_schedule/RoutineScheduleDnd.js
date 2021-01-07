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
import Container from 'react-bootstrap/Container'
import DroppableDay from './DroppableDay'
import Button from 'react-bootstrap/Button'
import  ConfirmDeleteWeekModal from '../modals/ConfirmDeleteWeekModal'

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

  const handleDestroyWeek  = async (weekNumber) => {
    const weekId = routineSchedule[weekNumber]._id
    const destroyedWeekResponse = await destroyWeek(weekId)
    if(!destroyedWeekResponse.success){ 
      alert(error_message)
      setTimeout(() => {
        clearErrorMessage()
      }, 3000)
    }
  }

  //crudingWeek='creating-week'

  return (
      <div 
      className='routine-schedule-dnd'>
      {modalShow && <ConfirmDeleteWeekModal week={weekToDestroy} setModalShow={setModalShow} modalShow={modalShow} />}
      {!currentSetGroups && <DarkSpinner />}
      {crudingWeek === 'creating-week' && <DarkSpinner text='Creating week...' />}
      {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
      {crudingWeek === 'updating-week' && <DarkSpinner text='Syncing Schedule...' />}
      {crudingSetGroup === 'updating-many-set-groups' && <DarkSpinner text='Syncing Schedule...' />}
      {currentSetGroups && !crudingWeek && 
      <DragDropContext 
       onDragEnd={ result => onSetGroupDragEnd(result, routineSchedule, saveSetGroupChanges, setRoutineSchedule)}>
      {Object.entries(routineSchedule).map(([weekNumber, days]) => {
        return(
          <Container
          key={`week-${weekNumber}`}
          className='week-container'>
            <div
            className='week-container-header'>
              <h5>{currentRoutine.name} - Week: {weekNumber}</h5>
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
          </Container>
        
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
