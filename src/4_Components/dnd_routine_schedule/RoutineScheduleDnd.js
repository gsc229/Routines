import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveWeekChanges, setCurrentWeek, setSelectedWeekNumbers} from '../../1_Actions/weekActions'
import {saveManySetGroupChanges, saveSetGroupChanges} from '../../1_Actions/setGroupActions'
import {bulkWriteExerciseSets} from '../../1_Actions/exerciseSetActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {routineScheduleConstructor} from './schedule_helpers/routineScheduleConstructor'
import {onSetGroupDragEnd} from './schedule_helpers/onSetGroupDragEnd'
import {DragDropContext} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import DroppableDay from './DroppableDay'
import ConfirmDeleteWeekModal from '../modals/confirm_delete_modals/ConfirmDeleteWeekModal'
import WeekHeader from './WeekHeader'

export const RoutineScheduleDnd = ({
  currentRoutine,
  currentWeeks,
  currentRoutineSetGroups,
  currentRoutineSets,
  setCurrentWeek,
  saveSetGroupChanges,
  crudingWeek,
  crudingSetGroup,
  crudingExerciseSet,
  selectedWeekNumbers,
  bulkWriteExerciseSets
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})
  const [modalShow, setModalShow] = useState(false)
  
  const bulkWrtingNow = () => {
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

  useEffect(() => {
    if(selectedWeekNumbers.includes('all')){
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, currentWeeks, currentRoutineSets))
    } else{
      const targetWeeks = currentWeeks.filter(week=> selectedWeekNumbers.find( num => num === week.week_number))
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, targetWeeks, currentRoutineSets))
    }

  }, [currentWeeks, currentRoutineSets, selectedWeekNumbers, currentRoutineSetGroups])

  return (
  <div 
    className='routine-schedule-dnd'>
      {modalShow && <ConfirmDeleteWeekModal setModalShow={setModalShow} modalShow={modalShow} />}
      {/* {!currentRoutineSetGroups && <DarkSpinner />} */}
      {crudingSetGroup === 'updating-many-set-groups' && <DarkSpinner text='Syncing Schedule...' />}

      {/* currentRoutineSetGroups  &&  */crudingSetGroup !== 'updating-many-set-groups' &&
      <DragDropContext 
       onDragEnd={ result => onSetGroupDragEnd(result, routineSchedule, saveSetGroupChanges, setRoutineSchedule, currentRoutineSets, bulkWriteExerciseSets)}>
      {Object.entries(routineSchedule).map(([weekNumber, days]) => {
        return(
          <div
          key={`week-${weekNumber}`}
          className='week-container'>
            <WeekHeader 
            setModalShow={setModalShow}
            routineSchedule={routineSchedule} 
            weekNumber={weekNumber} />
            
            {crudingWeek === 'creating-week' && <DarkSpinner text='Creating week...' />}
            {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
            {crudingWeek === 'updating-week' && <DarkSpinner text='Syncing Schedule...' />}
            {bulkWrtingNow() && <DarkSpinner text={`Saving ${bulkWrtingNow()} Changes...`} />}
            
            {!crudingWeek &&
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
              }
          </div>
        )})}
        </DragDropContext>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id,
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks,
  selectedWeekNumbers: state.weekReducer.selectedWeekNumbers,
  currentRoutineSetGroups: state.setGroupReducer.currentRoutineSetGroups,
  currentRoutineSets: state.exerciseSetReducer.currentRoutineSets,
  error_message: state.weekReducer.error_message,
  crudingWeek: state.weekReducer.crudingWeek,
  crudingSetGroup: state.setGroupReducer.crudingSetGroup,
  crudingExerciseSet: state.exerciseSetReducer.crudingExerciseSet
})

const mapDispatchToProps = {
  setCurrentWeek,
  saveSetGroupChanges,
  saveWeekChanges,
  saveManySetGroupChanges,
  bulkWriteExerciseSets,
  clearErrorMessage,
  setSelectedWeekNumbers
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScheduleDnd)
