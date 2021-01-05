import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {destroyWeek, setCurrentWeek} from '../../1_Actions/weekActions'
import {saveSetGroupChanges} from '../../1_Actions/setGroupActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {routineScheduleConstructor} from './routineScheduleConstructor'
import {onSetGroupDragEnd} from './scheduleHelpers'
import {DragDropContext} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import Container from 'react-bootstrap/Container'
import DroppableDay from './DroppableDay'

import Button from 'react-bootstrap/Button'

export const RoutineScheduleDnd = ({
  currentRoutine,
  currentWeeks,
  currentSetGroups,
  currentExerciseSets,
  destroyWeek,
  setCurrentWeek,
  saveSetGroupChanges,
  error_message,
  crudingWeek,
  clearErrorMessage
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})

  useEffect(async () => {
    setRoutineSchedule(routineScheduleConstructor(currentSetGroups, currentWeeks, currentExerciseSets))
  }, [currentSetGroups, currentWeeks, currentExerciseSets, currentWeeks])

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


    


  return (
      <div 
      className='routine-schedule-dnd'>
      {!currentSetGroups && <DarkSpinner />}
      {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
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
                onClick={() => handleDestroyWeek(weekNumber)}
                variant='danger'>Delete Week
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
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  error_message: state.weekReducer.error_message,
  crudingWeek: state.weekReducer.crudingWeek
})

const mapDispatchToProps = {
  destroyWeek,
  setCurrentWeek,
  saveSetGroupChanges,
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScheduleDnd)
