import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveWeekChanges, setCurrentWeek, setScheduleDnDSelectedWeekNumber} from '../../1_Actions/weekActions'
import {saveManySetGroupChanges, saveSetGroupChanges} from '../../1_Actions/setGroupActions'
import {bulkWriteExerciseSets} from '../../1_Actions/exerciseSetActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {syncWeeksAndSetGroups} from './schedule_helpers/syncWeeksAndSetGroups'
import {routineScheduleConstructor} from './schedule_helpers/routineScheduleConstructor'
import {onSetGroupDragEnd} from './schedule_helpers/onSetGroupDragEnd'
import {DragDropContext} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import DroppableDay from './DroppableDay'
import ConfirmDeleteWeekModal from '../modals/confirm_delete_modals/ConfirmDeleteWeekModal'
import WeekHeader from './WeekHeader'
import Select from 'react-select'
import {customStyles} from './schedule_helpers/selectStyles'
import makeAnimated from 'react-select/animated'

export const RoutineScheduleDnd = ({
  currentRoutine,
  currentWeeks,
  currentRoutineSetGroups,
  currentRoutineSets,
  setCurrentWeek,
  saveSetGroupChanges,
  saveWeekChanges,
  saveManySetGroupChanges,
  crudingWeek,
  crudingSetGroup,
  crudingExerciseSet,
  setScheduleDnDSelectedWeekNumber,
  scheduleDnDSelectedWeekNumbers,
  bulkWriteExerciseSets
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})
  const [selectOptions, setSelectOptions] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const animatedComponents = makeAnimated()
  
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

  useEffect( async() => {
    /* await syncWeeksAndSetGroups(currentWeeks, currentRoutineSetGroups, saveWeekChanges, saveManySetGroupChanges) */
    
  }, [])

  useEffect(() => {
    if(scheduleDnDSelectedWeekNumbers.find( num => num === 'all')){
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, currentWeeks, currentRoutineSets))
    } else{
      const targetWeeks = currentWeeks.filter(week=> scheduleDnDSelectedWeekNumbers.find( num => num === week.week_number))
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, targetWeeks, currentRoutineSets))
    }

    const newSelectOptions = []
    currentWeeks.forEach(week => newSelectOptions.push({label: `Week: ${week.week_number}`, value: week.week_number}))
    setSelectOptions(newSelectOptions)
  }, [currentWeeks, currentRoutineSets, scheduleDnDSelectedWeekNumbers, currentRoutineSetGroups])



  const handleWeekSelect = (newSelections) => {
    console.log({newSelections})
    
    if(newSelections === null){
      return setScheduleDnDSelectedWeekNumber(['all'])
    }
    newSelections = Array.isArray(newSelections) ? newSelections : [newSelections]

    const updatedWeekNums = newSelections.map( selection => selection.value)
    setScheduleDnDSelectedWeekNumber(updatedWeekNums)
  }
  

  return (
      <div 
      className='routine-schedule-dnd'>


      <Select
      components={animatedComponents}
      styles={customStyles}
      className='mt-3 mb-3'
      placeholder='All weeks...'
      onChange={handleWeekSelect}
      options={selectOptions}
      isMulti
      autoFocus
      isSearchable/>
    
  
      
      {modalShow && <ConfirmDeleteWeekModal setModalShow={setModalShow} modalShow={modalShow} />}
      {!currentRoutineSetGroups && <DarkSpinner />}
      {crudingWeek === 'creating-week' && <DarkSpinner text='Creating week...' />}
      {crudingWeek === 'deleting-week' && <DarkSpinner text="Deleting Week" />}
      {crudingWeek === 'updating-week' && <DarkSpinner text='Syncing Schedule...' />}
      {crudingSetGroup === 'updating-many-set-groups' && <DarkSpinner text='Syncing Schedule...' />}
      {bulkWrtingNow() && <DarkSpinner text={`Saving ${bulkWrtingNow()} Changes...`} />}
      


      {currentRoutineSetGroups && !crudingWeek && !bulkWrtingNow() &&
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
  scheduleDnDSelectedWeekNumbers: state.weekReducer.scheduleDnDSelectedWeekNumbers,
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
  setScheduleDnDSelectedWeekNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScheduleDnd)
