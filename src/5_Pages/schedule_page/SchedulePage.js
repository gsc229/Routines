import React from 'react'
import { connect } from 'react-redux'
import { fetchRoutines } from '../../1_Actions/routineActions'
import Container from 'react-bootstrap/Container'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Calendar from '../../4_Components/schedule_calendar/SchedulePageCalendar'
import {FiRefreshCcw} from 'react-icons/fi'

export const SchedulePage = ({
  fetchRoutines,
  user,
  crudingRoutine
}) => {

  const handleRefresh = async() => {
    await fetchRoutines(`?user=${user._id}&populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`)
  }


  return (
    <LayoutOne showTop={false}>
      <Container 
      style={{minHeight: 'fit-content'}}
      className='page manage-routines container'>
        <FiRefreshCcw style={{color: 'limegreen', cursor: 'pointer'}} onClick={handleRefresh} />
        {!crudingRoutine && <Calendar />}
        {crudingRoutine === 'fetching-routines' && <DarkSpinner text='Updating...' />}
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  crudingRoutine: state.routineReducer.crudingRoutine
})

const mapDispatchToProps = {
  fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage)
