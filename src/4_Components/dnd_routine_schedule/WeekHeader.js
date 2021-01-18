import React from 'react'
import { connect } from 'react-redux'
import { setCurrentWeek, setScheduleDnDSelectedWeekNumber,  bulkWriteWeeks} from '../../1_Actions/weekActions'
import { bulkWriteSetGroups } from '../../1_Actions/setGroupActions'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {bulkWriteExerciseSets} from '../../1_Actions/exerciseSetActions'
import {syncWeeksAndSetGroups} from './schedule_helpers/syncWeeksAndSetGroups'
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
  scheduleDnDSelectedWeekNumber
}) => {


  const handleCopyAndInsert = async (e) => {
    const routineId = currentWeek.routine
    const weekId = currentWeek._id
    const copyToWeekNumber = JSON.parse(e.target.value)
    const currentWeekCopy = {...currentWeek, copied_from: weekId, week_number: copyToWeekNumber}
    delete currentWeekCopy._id
    delete currentWeekCopy.id
    delete currentWeekCopy.createdAt
    delete currentWeekCopy.updatedAt
    delete currentWeekCopy._v
    const weeksUpdates = []
    // update the week_number of all the existing weeks
    currentWeeks.forEach(wk => {
      if(wk.week_number >= copyToWeekNumber){
        weeksUpdates.push({
          updateOne: {
            filter: {_id: wk._id},
            update: {week_number: wk.week_number + 1}
          }
        })
      }
    })
    // creates the new week witht the given week number
    weeksUpdates.push({
      insertOne: {
        document: {
          ...currentWeekCopy
        }
      }
    })
    console.log({routineId, weekId, currentWeekCopy, weeksUpdates})
    // one of these results will be the result of a new insert, the rest will be updated with new week_numbers
    const weeksResult = await bulkWriteWeeks(weeksUpdates, routineId)
    console.log({weeksResult})

    if(weeksResult.success){

      const newWeekId = weeksResult.data.find(wk => wk.copied_from === weekId)._id
      const copyOfSetGroups = currentRoutineSetGroups.filter(sg => sg.week === weekId)
      const setGroupUpdates = []
      // copy all the set groups
      copyOfSetGroups.forEach(sg => {

        const sgCopy = {
          ...sg,
          week: newWeekId,
          copied_from: sg._id
        }
        delete sgCopy.exercise_sets
        delete sgCopy._id 
        delete sgCopy.id 
        delete sgCopy.createdAt 
        delete sgCopy.updatedAt
        console.log({sgCopy})
        setGroupUpdates.push({
          insertOne: {
            document: sgCopy
          }
        })

        console.log({newWeekId, copyOfSetGroups, setGroupUpdates})

      })

        const setGroupsResult = await bulkWriteSetGroups(setGroupUpdates, {week: newWeekId})

        console.log({setGroupsResult})
        if(setGroupsResult.success){
          const exSetUpdates = []
          setGroupsResult.data.forEach(sg => {
            
            const copyOfExSets = currentRoutineSets.filter(set => set.set_group === sg.copied_from)

              copyOfExSets.forEach(exSet => {
                const exSetCopy ={
                  ...exSet,
                  set_group: sg._id,
                  week: newWeekId,
                  exercise: exSet.exercise._id
                }
                
                delete exSetCopy._id 
                delete exSetCopy.id 
                delete exSetCopy.createdAt 
                delete exSetCopy.updatedAt
                exSetUpdates.push({
                  insertOne: {
                    document: exSetCopy
                  }
                })
              })

            console.log({copyOfExSets})
          })

          console.log({exSetUpdates})

          const exSetResults = await bulkWriteExerciseSets(exSetUpdates, {week: newWeekId})
          console.log({exSetResults})
      }
      
    }

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
  clearErrorMessage,
  setScheduleDnDSelectedWeekNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekHeader)
