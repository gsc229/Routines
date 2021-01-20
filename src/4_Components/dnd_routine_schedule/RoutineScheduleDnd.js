import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {saveWeekChanges, setCurrentWeek, setScheduleDnDSelectedWeekNumber} from '../../1_Actions/weekActions'
import {saveManySetGroupChanges, saveSetGroupChanges} from '../../1_Actions/setGroupActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {syncWeeksAndSetGroups} from './schedule_helpers/syncWeeksAndSetGroups'
import {routineScheduleConstructor} from './schedule_helpers/routineScheduleConstructor'
import {onSetGroupDragEnd} from './schedule_helpers/onSetGroupDragEnd'
import {DragDropContext} from 'react-beautiful-dnd'
import DarkSpinner from '../spinners/DarkSpinner'
import Form from 'react-bootstrap/Form'
import DroppableDay from './DroppableDay'
import  ConfirmDeleteWeekModal from '../modals/confirm_delete_modals/ConfirmDeleteWeekModal'
import WeekHeader from './WeekHeader'
import Select from 'react-select'
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
  scheduleDnDSelectedWeekNumbers
}) => {

  const [routineSchedule, setRoutineSchedule] = useState({})
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

  useEffect( async() => {
    await syncWeeksAndSetGroups(currentWeeks, currentRoutineSetGroups, saveWeekChanges, saveManySetGroupChanges)

  }, [])

  useEffect(() => {
    if(scheduleDnDSelectedWeekNumbers.find( num => num === 'all')){
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, currentWeeks, currentRoutineSets))
    } else{
      const targetWeeks = currentWeeks.filter(week=> scheduleDnDSelectedWeekNumbers.find( num => num === week.week_number))
      setRoutineSchedule(routineScheduleConstructor(currentRoutineSetGroups, targetWeeks, currentRoutineSets))
    }

  }, [currentWeeks, currentRoutineSets, scheduleDnDSelectedWeekNumbers, currentRoutineSetGroups])

  const handleWeekSelect = (newSelections) => {
    
    if(newSelections === null){
      return setScheduleDnDSelectedWeekNumber(['all'])
    }

    const updatedWeekNums = newSelections.map( selection => selection.value)
    setScheduleDnDSelectedWeekNumber(updatedWeekNums)
  }

  const selectOptions = [{label: "All", value: 'all'}]
  currentWeeks.forEach(week => selectOptions.push({label: `Week: ${week.week_number}`, value: week.week_number}))

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dashed var(--routine-red)',
      color: 'var(--routine-red)',
      padding: 10,
      fontWeight: 'bold',
      cursor: 'pointer'
    }),
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--routine-red)',
        color: 'white'
      }
    },
    multiValueLabel: (styles) => {
      return{
        ...styles,
        color: 'white'
      }
    },
    multiValueRemove: (styles) => {
      return{
        ...styles,
        backgroundColor: 'var(--routine-red)',
        color: 'white',
        borderRadius: 0,
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'var(--gold-fusion)',
          color: 'white'
        }
      }
    },
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition }
    }
  }

  
  const animatedComponents = makeAnimated()

  return (
      <div 
      className='routine-schedule-dnd'>


      <Select
      components={animatedComponents}
      styles={customStyles}
      className='mb-3'
      placeholder='All weeks...'
      isMulti
      onChange={handleWeekSelect}
      options={selectOptions}
      autoFocus
      isSearchable/>
    
  
      
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
  clearErrorMessage,
  setScheduleDnDSelectedWeekNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScheduleDnd)
