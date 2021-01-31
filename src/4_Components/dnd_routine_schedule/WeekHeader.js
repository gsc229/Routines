import React from 'react'
import { connect } from 'react-redux'
import { setCurrentWeek, setScheduleDnDSelectedWeekNumber,  bulkWriteWeeks, clearCurrentWeek} from '../../1_Actions/weekActions'
import { bulkWriteSetGroups } from '../../1_Actions/setGroupActions'
import {bulkWriteExerciseSets} from '../../1_Actions/exerciseSetActions'
import {fetchFlattenedRoutine} from '../../1_Actions/routineActions'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import  Col  from 'react-bootstrap/Col'

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
  scheduleDnDSelectedWeekNumbers,
  fetchFlattenedRoutine,
  clearCurrentWeek
}) => {


  const handleCopyAndInsertWeek = async (e) => {
    const routineId = currentRoutine._id
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


    if(!weekBulkWriteResults.success){
      return fetchFlattenedRoutine(routineId)
    }

    if(weekBulkWriteResults.success){
      newWeekId = weekBulkWriteResults.data.find(wk => wk.copied_from === idOfCopiedWeek)._id
    }
    
    // create the new set group ojects
    currentRoutineSetGroups.filter(sg => sg.week === idOfCopiedWeek).forEach(sg => {
      sg.week = newWeekId // overwrite old week id
      sg.copied_from = sg._id // keep track of the ols set group id
      oldToNewSetGroupIds[sg._id] = '' // register the old id in a dictionary
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

    if(!bulkSetGroupCommands.length){
      return fetchFlattenedRoutine(routineId)
    }
    // one of these results will have null in the copied_from as it is the original
    const bulkWriteSetGroupsResult = await bulkWriteSetGroups(bulkSetGroupCommands, {routine: routineId})
    
    if(!bulkWriteSetGroupsResult.success){
      return fetchFlattenedRoutine(routineId)
    }

    // map old sg ids to new one's for the next bulkwrite
    bulkWriteSetGroupsResult.data.forEach(newSg => oldToNewSetGroupIds[newSg.copied_from] = newSg._id)

    console.log({oldToNewSetGroupIds})
    // create the new sets
    currentRoutineSets.filter(exSet => exSet.week === idOfCopiedWeek).forEach(exSet => {
      console.log({oldToNewSetGroupIds}, exSet.set_group ,oldToNewSetGroupIds[exSet.set_group], {exSet})
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

    console.log({bulkExSetCommands})

    if(!bulkExSetCommands.length){
      return fetchFlattenedRoutine(routineId)
    }

    const bulkWriteExerciseSetsResult = await bulkWriteExerciseSets(bulkExSetCommands, {week: newWeekId})

    if(!bulkWriteExerciseSetsResult.success){
      return fetchFlattenedRoutine(routineId)
    }

    
    /* fetchFlattenedRoutine(routineId)
    setScheduleDnDSelectedWeekNumber([copyToWeekNumber]) */

  }



  const handleMoveTo = async (e) => {
    console.log({ targetValue: e.target.value.week_number})
    const destinationWeekNumber = JSON.parse(e.target.value)
    const sourceWeekNumber = JSON.parse(currentWeek.week_number)
    const sourceId = currentWeek._id
    const updates = []

    currentWeeks.forEach(wk => {

      console.log({week: wk._id, week_number: wk.week_number, sourceWeekNumber, destinationWeekNumber})

      if(wk._id === sourceId){
        console.log('if wk._id === sourceId: ', {week: wk._id, sourceId})
        updates.push({
          updateOne: {
            filter: {_id: sourceId},
            update: {week_number: destinationWeekNumber}
          }
        })
      } else if( wk.week_number > sourceWeekNumber && wk.week_number <= destinationWeekNumber){
        console.log('if wk.week_number > sourceWeekNumber && wk.week_number <= destinationWeekNumber', {week: wk._id,sourceWeekNumber, week_number: wk.week_number, destinationWeekNumber})
          updates.push({
            updateOne: {
              filter: {_id: wk._id},
              update: {week_number: wk.week_number - 1}
            }
          })
      } else if(wk.week_number >= destinationWeekNumber &&  wk.week_number < sourceWeekNumber ){
        console.log('if wk.week_number >= destinationWeekNumber &&  wk.weeek_number < sourceWeekNumber', {week: wk._id, destinationWeekNumber, week_number: wk.week_number, sourceWeekNumber })
          updates.push({
            updateOne: {
              filter: {_id: wk._id},
              update: {week_number: wk.week_number + 1}
            }
          })
      }
    })

    
    console.log({updates})
    await bulkWriteWeeks(updates,  currentRoutine._id)
    //setScheduleDnDSelectedWeekNumber([destinationWeekNumber])
  }


  const handleCreateBlankAndInsert = async (e) => {
    const copyToWeekNumber = JSON.parse(e.target.value)
    const routineId = currentRoutine._id
    // currentWeek will have been reset
    const blankWeek = 
    {...currentWeek, user: userId, routine: routineId, week_number: copyToWeekNumber}

    
    const currentWeeksUpdates = []

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
          ...blankWeek
        }
      }
    })

    const weekBulkWriteResults = await bulkWriteWeeks(currentWeeksUpdates, routineId)
    //fetchFlattenedRoutine(routineId)
    //setScheduleDnDSelectedWeekNumber([copyToWeekNumber])
  }



  return (
    
    <div
    className='week-container-header'>
      <div className='header-top'>
        <h5>{currentRoutine.name} - Week: {routineSchedule[weekNumber].week_number}</h5>
        <Button
          className='delete-week-btn'
          onClick={() =>{ 
          setModalShow(true)
          setCurrentWeek(currentWeeks.find(week => week._id === routineSchedule[weekNumber]._id))
          }}>
            Delete Week
        </Button>
      </div>
      <Form className='week-header-form'>
        <Form.Row>
            <Col sm='12' md='3'>
              <Form.Group controlId={`move-week-select-${weekNumber}`}>
                <Form.Label>Move Week To: </Form.Label>
                <Form.Control
                size='sm'
                onClick={()=> setCurrentWeek(currentWeeks.find(week => week._id === routineSchedule[weekNumber]._id))}
                onChange={handleMoveTo}
                className='select-input header-select-input'
                as="select">
                <option value='choose' disabled={true}>Move to...</option>
                {currentWeeks.filter(wk => {
                 return wk._id !== currentWeek._id
                }).map(week => {
                  return(
                  <option
                  value={week.week_number}
                  key={week._id}>
                    Week {week.week_number}
                  </option>
                  )})}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm='12' md='3'>
              <Form.Group controlId={`copy-week-select-${weekNumber}`}>
              <Form.Label>Copy Week and Insert: </Form.Label>
              <Form.Control
              size='sm'
              onClick={()=> setCurrentWeek(currentWeeks.find(week => week._id === routineSchedule[weekNumber]._id))}
              onChange={handleCopyAndInsertWeek}
              className='select-input header-select-input'
              as="select">
                <option value='choose' disabled={true}>Insert at...</option>
                {currentWeeks.map(week => {
                return week.week_number !== currentWeek.week_number &&
                <option
                value={week.week_number}
                key={week._id}>
                  Week {week.week_number}
                </option>})}
              </Form.Control>
            </Form.Group>
            </Col>
            <Col sm='12' md='3'>
              <Form.Group controlId={`insert-blank-week-${weekNumber}`}>
              <Form.Label>Insert Blank Week: </Form.Label>
              <Form.Control
              size='sm'
              onClick={clearCurrentWeek}
              onChange={handleCreateBlankAndInsert}
              className='select-input header-select-input'
              as="select">
                <option value='choose' disabled={true}>Choose...</option>
                <option 
                value={weekNumber}>
                  Here
                </option>
                <option 
                value={JSON.parse(weekNumber) + 1}>
                  Below
                </option>
              </Form.Control>
            </Form.Group>
            </Col>
        
        </Form.Row>
      </Form>

      
    </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id,
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks,
  currentWeek: state.weekReducer.currentWeek,
  scheduleDnDSelectedWeekNumbers: state.weekReducer.scheduleDnDSelectedWeekNumbers,
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
  fetchFlattenedRoutine,
  clearCurrentWeek
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekHeader)
