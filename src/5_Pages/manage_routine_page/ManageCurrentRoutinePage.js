import React from 'react'
import { connect } from 'react-redux'
import {fetchRoutineById} from '../../1_Actions/routineActions'
import {createNewWeek} from '../../1_Actions/weekActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineScheduleDnd from '../../4_Components/dnd_routine_schedule/RoutineScheduleDnd'
import Button from 'react-bootstrap/Button'
import {FiRefreshCcw} from 'react-icons/fi'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'

export const ViewRoutinePage = ({
  currentRoutine, 
  crudingRoutine,
  fetchRoutineById, 
  createNewWeek,
  userId
  
}) => {
  const currentRoutineRefreshQuery = `?populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`
  
  const handleRefresh = () => {
    fetchRoutineById(currentRoutine._id, currentRoutineRefreshQuery)
  }

  const addWeek = async () => {
    const credentials = {
      user: userId,
      routine: currentRoutine._id,
      week_number: currentRoutine.weeks.length + 1
    }
    console.log({credentials})
    createNewWeek(credentials)

  }

  const noWeeksMessage = () => {
    return currentRoutine.weeks && !currentRoutine.weeks.length > 0 && !crudingRoutine &&
      <div className='no-weeks-message'>
        <p>You don't currently have anything scheduled for this routine.<br/>Start by adding a week: </p>
        <p> </p>
      </div>
  }

  const showWeeks = () => {
    return currentRoutine.weeks && currentRoutine.weeks.length > 0 && !crudingRoutine &&
      <div>
        <FiRefreshCcw style={{color: 'limegreen', cursor: 'pointer'}} onClick={handleRefresh} />
        <RoutineScheduleDnd />
      </div>
  }


  return (
    <Layout>
      <Container className='view-routine-container'>
        <h2>Managing Routine: {currentRoutine.name || 'id' + currentRoutine._id}</h2>
        {showWeeks()}
        {noWeeksMessage()}
        {crudingRoutine && <DarkSpinner text='Loading schedule...' />}
        <Button
        className='add-week-btn' 
        onClick={addWeek}
        variant='primary'>Add Week</Button>
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  crudingRoutine: state.routineReducer.crudingRoutine,
  currentRoutine: state.routineReducer.currentRoutine,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  fetchRoutineById,
  createNewWeek
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoutinePage)
