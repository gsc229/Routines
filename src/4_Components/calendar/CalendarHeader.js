import React from 'react'

const CalendarHeader = ({value, setValue}) => {

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

  const dayOfWeek = ["Su","Mo","Tu","We","Th","Fr","Sa"] 
  
  return (
    <div className='calendar-header'>
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

        <div className="calendar-header-bottom">
          {dayOfWeek.map(day => <h6 key={day}>{day}</h6>)}
        </div>

    </div>
  )
}

export default CalendarHeader
