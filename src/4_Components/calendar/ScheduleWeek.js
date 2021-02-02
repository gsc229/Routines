import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import DaySection from './DaySection'
import {weekStyles, dayStyles} from '../calendar/styles'


const ScheduleWeek = ({
  week,
  datesSetGroups,
  routineNamesColorsStartDates,
  isSingleRoutine=false,
  handleDayClick,
  showEditLink=false,
  routine,
  value,
  height,
  width
}) => {
  
  return (
    <div 
    className={" week" }>
    {week.map((day, index)=>{
    console.log({routineNamesColorsStartDates})
    const formattedDay = day.format('MM-DD-YYYY')
    const daySetGroups = datesSetGroups[formattedDay] && isSingleRoutine 
    ? datesSetGroups[formattedDay].filter(sg => sg.routine === routine._id)
    : datesSetGroups[formattedDay]

    return daySetGroups ?
      <div
      onClick={() => handleDayClick(daySetGroups, formattedDay)}
      key={day._d}
      className={dayStyles(day, value) + " day"}>
        <p>{day.format("D")}</p>
        {daySetGroups &&
        <DaySection
        day={day}
        showEditLink={showEditLink}
        windowSize={{height, width}}
        routineNamesColorsStartDates={routineNamesColorsStartDates}
        daySetGroups={daySetGroups} />}
        {formattedDay}
      </div>
    : // ↑ Day has sets ↑ - ↓ Day has no sets ↓ 
      <div
        key={day._d}
        className={dayStyles(day, value) + " day day-no-sets"}>
          <p>{day.format("D")}</p>
      </div>
    })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  routineNamesColorsStartDates: state.routineReducer.routineNamesColorsStartDates,
  userRoutines: state.routineReducer.userRoutines,
  userId: state.userReducer.user._id
})


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleWeek)