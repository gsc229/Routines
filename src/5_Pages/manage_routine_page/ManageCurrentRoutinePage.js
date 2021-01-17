import React from 'react'
import { connect } from 'react-redux'
import {fetchFlattenedRoutine} from '../../1_Actions/routineActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineScheduleDnd from '../../4_Components/dnd_routine_schedule/RoutineScheduleDnd'
import {FiRefreshCcw} from 'react-icons/fi'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'

export const ViewRoutinePage = ({
  currentRoutine, 
  currentWeeks,
  crudingRoutine,
  crudingWeek,
  fetchFlattenedRoutine,
}) => {
  
  const handleRefresh = () => {
    fetchFlattenedRoutine(currentRoutine._id)
  }
  
  

  const noWeeksMessage = () => {
    return currentWeeks && !currentWeeks.length > 0 && !crudingRoutine &&
      <div className='no-weeks-message'>
        <p>You don't currently have anything scheduled for this routine.<br/>Start by adding a week: </p>
      </div>
  }

  const showWeeks = () => {
    return currentWeeks && currentWeeks.length > 0 && !crudingRoutine &&
      <div>
        <FiRefreshCcw style={{color: 'limegreen', cursor: 'pointer'}} onClick={handleRefresh} />
        <RoutineScheduleDnd />
      </div>
  }

   


  return (
    <Layout>
      <Container className='page view-routine-container'>
        <h2>Managing Routine: {currentRoutine.name || 'id' + currentRoutine._id}</h2>
        {showWeeks()}
        {noWeeksMessage()}
        {crudingRoutine && <DarkSpinner text='Loading schedule...' />}
        {crudingWeek && <DarkSpinner text='Saving changes...' />}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  crudingRoutine: state.routineReducer.crudingRoutine,
  crudingWeek: state.weekReducer.crudingWeek,
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks
})

const mapDispatchToProps = {
  fetchFlattenedRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoutinePage)
