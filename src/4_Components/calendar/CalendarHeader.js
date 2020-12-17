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


  return (
    <div className="calendar-header">
        <div 
        onClick={() => setValue(prevMonth)}
        className='prev-month  arrow'>{String.fromCharCode(171)}</div>
        <div>{currMonthName()} {currYear()}</div>
        <div 
        onClick={() => setValue(nextMonth)}
        className="next-month arrow">{String.fromCharCode(187)}</div>
      </div>
  )
}

export default CalendarHeader
