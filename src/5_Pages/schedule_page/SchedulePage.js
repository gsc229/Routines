import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Calendar from '../../4_Components/calendar/SchedulePageCalendar'

export const SchedulePage = (props) => {
  return (
    <LayoutOne showTop={false}>
      <Container className='page manage-routines container'>
        <Calendar />
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage)
