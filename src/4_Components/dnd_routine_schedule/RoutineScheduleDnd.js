import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {destroyWeek, setCurrentWeek} from '../../1_Actions/weekActions'
import {fetchRoutineById} from '../../1_Actions/routineActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {currentRoutineRefreshWkSgEsEx} from '../../3_APIs/queryStrings'
import {routineScheduleConstructor} from './routineScheduleConstructor'
import {onSetGroupDragEnd} from './scheduleHelpers'
import {DragDropContext} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import Container from 'react-bootstrap/Container'
import DroppableDay from './DroppableDay'

import Button from 'react-bootstrap/Button'

export const RoutineScheduleDnd = ({
  weeks, 
  currentRoutine,
  destroyWeek,
  setCurrentWeek,
  set_groups,
  error_message,
  crudingWeek,
  clearErrorMessage
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})

  useEffect(async () => {
    setRoutineSchedule(routineScheduleConstructor(set_groups, weeks))
  }, [set_groups, weeks])

  const handleDestroyWeek  = async (weekNumber) => {
    const destroySuccess = await destroyWeek(routineSchedule[weekNumber])
    if(destroySuccess){
      fetchRoutineById(currentRoutine._id, currentRoutineRefreshWkSgEsEx)
    } else{ 
      alert(error_message)
      setTimeout(() => {
        clearErrorMessage()
      }, 3000)
    }
  }
    


  return (
      <div 
      className='routine-schedule-dnd'>
      {!set_groups && <DarkSpinner />}
      {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
      {set_groups && !crudingWeek && 
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
  weeks: state.routineReducer.currentRoutine.weeks,
  currentRoutine: state.routineReducer.currentRoutine,
  set_groups: state.routineReducer.currentRoutine.set_groups,
  error_message: state.weekReducer.error_message,
  crudingWeek: state.weekReducer.crudingWeek
})

const mapDispatchToProps = {
  destroyWeek,
  setCurrentWeek,
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScheduleDnd)
