import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {fetchRoutineById} from '../../1_Actions/routineActions'
import {destroyWeek, setCurrentWeek} from '../../1_Actions/weekActions'
import {routineScheduleConstructor} from './routineScheduleConstructor'
import {onSetGroupDragEnd} from './scheduleHelpers'
import {Link} from 'react-router-dom'
import SetGroupScheduleCard from '../set_group/SetGroupScheduleCard'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import Button from 'react-bootstrap/Button'

export const RoutineWeeksBank = ({
  weeks, 
  currentRoutine,
  destroyWeek,
  setCurrentWeek,
  fetchRoutineById,
  set_groups
}) => {

  const dayKey = {
    1: "Su",
    2: "Mo",
    3: "Tu",
    4: "We",
    5: "Th",
    6: "Fr",
    7: "Sa"
  }

  

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
          className='week-container'>
            <div
            className='week-container-header'>
              <h6>Week: {weekNumber}</h6>
              <Button 
                onClick={() => destroyWeek(routineSchedule[weekNumber])}
                variant='danger'>Delete Week
              </Button>
            </div>
                <div
                className='week-container-row'>
                {Object.entries(routineSchedule[weekNumber]).map(([dayNumber, name]) => {
                  return dayNumber !== "_id" && dayNumber !== "week_number" && (
           
                    <Droppable 
                    key={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}
                    droppableId={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}>
                    {(provided, snapshot) => {
                      return(
                        <Card
                        {...provided.droppableProps}
                        ref={provided.innerRef}                       
                        className={`day-container-card ${snapshot.isDraggingOver && 'day-container-card-hovering'}`}>
                          <Card.Header>
                            <div
                            className='day-header'>
                              <h6>{dayKey[dayNumber]}</h6>
                              <Link 
                              onClick={() => setCurrentWeek(routineSchedule[weekNumber])}
                              to={
                                `/create-set-group/${currentRoutine.slug ? currentRoutine.slug : currentRoutine.name}/week-${routineSchedule[weekNumber].week_number}`}>
                                Add Sets
                              </Link>
                            </div>
                          </Card.Header>
                            <Card.Body>
                              {routineSchedule[weekNumber][dayNumber].set_groups.map((set_group, index) => {
                                return (
                                <Draggable
                                key={set_group._id}
                                draggableId={set_group._id}
                                index={index}>
                                {(provided, snapshot)=>{
                                  return(
                                    <div
                                    className={`set-group-draggable-container ${snapshot.isDragging && 'set-group-draggable-container-dragging'}`}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    >
                                      <SetGroupScheduleCard 
                                      set_group={set_group} 
                                      isDragging={snapshot.isDragging} />
                                      {provided.placeholder}
                                    </div>
                                  )
                                }}
                                  
                                </Draggable>)
                              })}
                          {provided.placeholder}
                            </Card.Body>
                        
                      </Card>)
                    }}
                    </Droppable>
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
