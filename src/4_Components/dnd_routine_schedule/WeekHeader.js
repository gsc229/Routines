import React from 'react'
import { connect } from 'react-redux'
import { setCurrentWeek, setScheduleDnDSelectedWeekNumber,  bulkWriteWeeks} from '../../1_Actions/weekActions'
import { bulkWriteSetGroups } from '../../1_Actions/setGroupActions'
import {bulkWriteExerciseSets} from '../../1_Actions/exerciseSetActions'
import {fetchFlattenedRoutine} from '../../1_Actions/routineActions'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const WeekHeader = ({
  routineSchedule,
  weekNumber,
  setModalShow,
  userId,
  currentRoutine,
  currentWeeks,
  currentWeek,
  bulkWriteWeeks,
  bulkWriteSetGroups,
  bulkWriteExerciseSets,
  currentRoutineSetGroups,
  currentRoutineSets,
  setCurrentWeek,
  crudingWeek,
  crudingSetGroup,
  setScheduleDnDSelectedWeekNumber,
  scheduleDnDSelectedWeekNumber,
  fetchFlattenedRoutine
}) => {


  const handleCopyAndInsert = async (e) => {
    const routineId = currentWeek.routine
    const idOfCopiedWeek = currentWeek._id
    let newWeekId
    const copyToWeekNumber = JSON.parse(e.target.value)
    const currentWeeksUpdates = []
    const oldToNewSetGroupIds = {}
    const bulkSetGroupCommands = []
    const bulkExSetCommands = []

    const currentWeekCopy = 
    {...currentWeek, copied_from: idOfCopiedWeek, week_number: copyToWeekNumber}
    delete currentWeekCopy._id
    delete currentWeekCopy.id
    delete currentWeekCopy.createdAt
    delete currentWeekCopy.updatedAt
    delete currentWeekCopy._v

    // update the week_number of all the existing weeks
    currentWeeks.forEach(wk => {
      if(wk.week_number >= copyToWeekNumber){
        currentWeeksUpdates.push({
          updateOne: {
            filter: {_id: wk._id},
            update: {week_number: wk.week_number + 1}
          }
        })
      }
    })
    // creates the new week witht the given week number
    currentWeeksUpdates.push({
      insertOne: {
        document: {
          ...currentWeekCopy
        }
      }
    })
    
    // one of these results will be the result of a new insert, the rest will be updated with new week_numbers
    const weekBulkWriteResults = await bulkWriteWeeks(currentWeeksUpdates, routineId)
    console.log({weekBulkWriteResults})


    if(!weekBulkWriteResults.success){
      return fetchFlattenedRoutine(routineId)
    }

    if(weekBulkWriteResults.success){
      newWeekId = weekBulkWriteResults.data.find(wk => wk.copied_from === idOfCopiedWeek)._id
    }
    
    currentRoutineSetGroups.filter(sg => sg.week === idOfCopiedWeek).forEach(sg => {
      sg.week = newWeekId
      sg.copied_from = sg._id
      oldToNewSetGroupIds[sg._id] = ''
      delete sg.updatedAt
      delete sg.createdAt
      delete sg.exercise_sets
      delete sg._id
      delete sg.id 
      bulkSetGroupCommands.push({
        insertOne: {
          document: sg
        }
      })
    })

    const bulkWriteSetGroupsResult = await bulkWriteSetGroups(bulkSetGroupCommands, {routine: routineId})
    console.log(bulkWriteSetGroupsResult)
    if(!bulkWriteSetGroupsResult.success){
      return fetchFlattenedRoutine(routineId)
    }

    // map old sg ids to new one's for the next bulkwrite
    bulkWriteSetGroupsResult.data.forEach(newSg => oldToNewSetGroupIds[newSg.copied_from] = newSg._id)

    
    currentRoutineSets.filter(exSet => exSet.week === idOfCopiedWeek).forEach(exSet => {
      exSet.week = newWeekId
      exSet.set_group = oldToNewSetGroupIds[exSet.set_group]
      exSet.exercise = exSet.exercise ? exSet.exercise._id ? exSet.exercise._id : exSet.exercise : null // just in caes the exercise had been populated (only need the _id when creating, not the whole object)
      exSet.copied_from = exSet._id
      delete exSet._id
      delete exSet.id
      delete exSet.createdAt
      delete exSet.updatedAt
      bulkExSetCommands.push({
        insertOne: {
          document: exSet
        }
      })
    })

    const bulkWriteExerciseSetsResult = await bulkWriteExerciseSets(bulkExSetCommands, {week: newWeekId})
    console.log({bulkWriteExerciseSetsResult})
    if(!bulkExSetCommands){
      return fetchFlattenedRoutine(routineId)
    }

    
    fetchFlattenedRoutine(routineId)
    setScheduleDnDSelectedWeekNumber('all')

  }



  return (
    
    <div
    className='week-container-header'>
      <h5>{currentRoutine.name} - Week: {routineSchedule[weekNumber].week_number}</h5>
      <Form className='week-selector'>  
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Copy and insert at: </Form.Label>
          <Form.Control
          onClick={()=> setCurrentWeek(currentWeeks.find(week => week._id === routineSchedule[weekNumber]._id))}
          onChange={handleCopyAndInsert}
          as="select">
            <option selected={true} value='choose' disabled={true}>Choose</option>
            {currentWeeks.map(week => 
            <option
            selected={false}
            value={week.week_number}
            key={week._id}>
              Week {week.week_number}
            </option>)}
          </Form.Control>
        </Form.Group>
      </Form>

      <Button>Insert Blank Week</Button>
      <Button 
      onClick={() =>{ 
      setModalShow(true)
      setCurrentWeek(currentWeeks.find(week => week._id === routineSchedule[weekNumber]._id))
      }}>
        Delete Week
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id,
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks,
  currentWeek: state.weekReducer.currentWeek,
  scheduleDnDSelectedWeekNumber: state.weekReducer.scheduleDnDSelectedWeekNumber,
  currentRoutineSetGroups: state.setGroupReducer.currentRoutineSetGroups,
  currentRoutineSets: state.exerciseSetReducer.currentRoutineSets,
  error_message: state.weekReducer.error_message,
  crudingWeek: state.weekReducer.crudingWeek,
  crudingSetGroup: state.setGroupReducer.crudingSetGroup
})

const mapDispatchToProps = {
  bulkWriteWeeks,
  bulkWriteSetGroups,
  bulkWriteExerciseSets,
  setCurrentWeek,
  setScheduleDnDSelectedWeekNumber,
  fetchFlattenedRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekHeader)
