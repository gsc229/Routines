import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroyWeek, setCurrentWeek} from '../../1_Actions/weekActions'
import {routineScheduleConstructor} from './routineScheduleConstructor'
import {onSetGroupDragEnd} from '../set_group/scheduleHelpers'
import {Link} from 'react-router-dom'
import SetGroupScheduleCard from '../set_group/SetGroupScheduleCard'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Button from 'react-bootstrap/Button'

export const RoutineWeeksBank = ({
  weeks, 
  currentRoutine,
  destroyWeek,
  setCurrentWeek,
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

  

  const [routineSchedule, setRoutineSchedule] = useState(routineScheduleConstructor(set_groups, weeks))

  console.log('RoutineWeeksBank newRouinteSchedule: ',{routineSchedule})

  return (
      <div 
      style={{height: 'fit-content', border: '1px solid green'}} 
      className='routine-weeks-bank'>
      <h6>Weeks go here</h6>
      <DragDropContext 
       onDragEnd={ result => onSetGroupDragEnd(result, routineSchedule, setRoutineSchedule)}>
      {Object.entries(routineSchedule).map(([weekNumber, days]) => {
        console.log({weekNumber})
        return(
          
          
          <Container
          style={{padding: 0}}
          className='week-container'>
            <div 
            style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}
            className='week-container-header'>
              <h6>Week: {weekNumber}</h6>
              <Button 
                onClick={() => destroyWeek(routineSchedule[weekNumber])}
                variant='danger'>Delete Week
              </Button>
            </div>
                <Row
                style={{display: 'flex', justifyContent: 'flex-start', width: '100%', margin: '10px auto', minHeight: '100px', marginBottom: '20px'}}
                className='weeek-container-row'>
                {Object.entries(routineSchedule[weekNumber]).map(([dayNumber, name]) => {
                  console.log({weekNumber, days,dayNumber,name})
                  return dayNumber !== "_id" && dayNumber !== "week_number" && (
                    <Droppable 
                    key={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}
                    droppableId={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}>
                    {(provided, snapshot) => {
                      return(
                        <Col
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        xl='4'
                        style={{border: '1px solid red', width: '100%', minHeight: '200px', padding: '5px'}}
                        className='day-container'>
                    
                        <div 
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                        className='day-header'>
                          <h6>{dayKey[dayNumber]}</h6>
                          <Link 
                          onClick={() => setCurrentWeek(routineSchedule[weekNumber])}
                          to={
                            `/create-set-group/${currentRoutine.slug ? currentRoutine.slug : currentRoutine.name}/week-${routineSchedule[weekNumber].week_number}`}>
                            Add Sets
                          </Link>
                        </div>
                          {routineSchedule[weekNumber][dayNumber].set_groups.map((set_group, index) => {
                            return (
                            <Draggable
                            key={set_group._id}
                            draggableId={set_group._id}
                            index={index}>
                            {(provided, snapshot)=>{
                              return(
                                <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                >
                                  <SetGroupScheduleCard set_group={set_group} />
                                  {provided.placeholder}
                                </div>
                              )
                            }}
                              
                            </Draggable>)
                          })}
                      {provided.placeholder}
                      </Col>)
                    }}
                    </Droppable>
                  )
                })}
              </Row>
            


          </Container>
        
        )})}
        </DragDropContext>
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
  setCurrentWeek
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineWeeksBank)
