import React from 'react'
import {connect} from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import {setCurrentRoutine, fetchFlattenedRoutine} from '../../1_Actions/routineActions'

const CalendarHeader = ({value, setValue, routine, fetchFlattenedRoutine}) => {

  function currMonthName(){
    return value.format("MMMM")
  }

  function currYear(){
    return value.format("YYYY")
  }

  function prevMonth(){
   return value.clone().subtract(1, "month").startOf('month')
  }

  function nextMonth(){
   return value.clone().add(1, "month").startOf('month')
  }


  const handleEditScheduleClick = () => {
    fetchFlattenedRoutine(routine._id)
  }

  const dayOfWeek = ["Su","Mo","Tu","We","Th","Fr","Sa"] 
  
  return (
    <div style={{borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}} className='calendar-header'>
      
      {routine && 
      <div className='view-routine-link-container'>
        <Link 
        onClick={handleEditScheduleClick}
        className='view-routine-link' to={`/view-routine/${routine._id}/${routine.slug || routine.name}`} >
          Edit Schedule
        </Link>
      </div>}
      <Navbar style={{borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}} bg='dark'>
        <div className="calendar-header-top">
          <h6
            onClick={() => setValue(prevMonth)}
            className='prev-month  arrow'>
              {String.fromCharCode(171)}
          </h6>
          <div>{currMonthName()} {currYear()}</div>
          <h6 
            onClick={() => setValue(nextMonth)}
            className="next-month arrow">
              {String.fromCharCode(187)}
          </h6>
        </div>
      </Navbar>
      <div className="calendar-header-bottom">
        {dayOfWeek.map(day => <h6 key={day}>{day}</h6>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({

})


const mapDispatchToProps = {
  setCurrentRoutine,
  fetchFlattenedRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeader)
