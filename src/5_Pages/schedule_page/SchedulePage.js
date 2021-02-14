import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchRoutines } from '../../1_Actions/routineActions'
import Container from 'react-bootstrap/Container'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Calendar from '../../4_Components/schedule_calendar/SchedulePageCalendar'
import {FiRefreshCcw} from 'react-icons/fi'
import Button from 'react-bootstrap/Button'

export const SchedulePage = ({
  fetchRoutines,
  user,
  crudingRoutine,
  userRoutines
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
        {userRoutines.length > 0 && !crudingRoutine && 
        <Calendar />}
        {crudingRoutine === 'fetching-routines' && <DarkSpinner text='Updating...' />}
        {userRoutines.length === 0 && 
        <div className='no-routines-message'>
          <h6>You don't have any routines</h6>
          <Button 
          to='/create-routine'
          as={Link}>Create New Routine</Button>
        </div>}
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  crudingRoutine: state.routineReducer.crudingRoutine,
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage)
