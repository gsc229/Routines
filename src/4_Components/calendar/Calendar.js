import React, {useState, useEffect} from 'react'
import moment from 'moment'
import buildCalendar from './build'
import {dayStyles, beforeToday, weekStyles} from './styles'
import CalendarHeader from './CalendarHeader'

const Calendar = ({calendarId}) => {

  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())
  
  useEffect(()=>{
    setCalendar(buildCalendar(value))
  },[value])


  return (
    <div className="main-calendar" id={calendarId}>
      <CalendarHeader value={value} setValue={setValue} />      
      {
      calendar.map((week, index) => 
        <div key={index} className={weekStyles(week) + " week" }>
        {week.map(day=> 
        <div
        key={day._d}
        onClick={() => !beforeToday(day) && setValue(day)}
        className={dayStyles(day, value) + " day"}>
          <p>{day.format("D")}</p>
        </div>)
        }</div>)
      }
    </div>
  )
}

export default Calendar
