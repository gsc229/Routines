import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {fetchRoutineById} from '../../1_Actions/routineActions'
import {destroyWeek, setCurrentWeek} from '../../1_Actions/weekActions'
import {routineScheduleConstructor} from './routineScheduleConstructor'
import {onSetGroupDragEnd} from './scheduleHelpers'
import {Link} from 'react-router-dom'
import SetGroupScheduleCard from './SetGroupScheduleCard'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import DroppableDay from './DroppableDay'

import Button from 'react-bootstrap/Button'

export const RoutineWeeksBank = ({
  weeks, 
  currentRoutine,
  destroyWeek,
  setCurrentWeek,
  fetchRoutineById,
  set_groups
}) => {

 

  

  const [routineSchedule, setRoutineSchedule] = useState({})

  const currentPopulateQuery = `?populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`
  useEffect(async () => {
    fetchRoutineById(currentRoutine._id, currentPopulateQuery)
  }, [])

  useEffect(async () => {
    setRoutineSchedule(routineScheduleConstructor(set_groups, weeks))
  }, [set_groups, weeks])

  

  return (
      <div 
      className='routine-schedule-dnd'>
      {!set_groups && <DarkSpinner />}
      {set_groups && 
      <DragDropContext 
       onDragEnd={ result => onSetGroupDragEnd(result, routineSchedule, setRoutineSchedule)}>
      {Object.entries(routineSchedule).map(([weekNumber, days]) => {
        return(
          <Container
          key={`week-${weekNumber}`}
          className='week-container'>
            <div
            className='week-container-header'>
              <h5>{currentRoutine.name} - Week: {weekNumber}</h5>
              <Button 
                onClick={() => destroyWeek(routineSchedule[weekNumber])}
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
  weeks: state.routineReducer.currentRoutine.weeks,
  currentRoutine: state.routineReducer.currentRoutine,
  set_groups: state.routineReducer.currentRoutine.set_groups
})

const mapDispatchToProps = {
  destroyWeek,
  setCurrentWeek,
  fetchRoutineById
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineWeeksBank)
