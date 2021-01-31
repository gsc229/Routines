import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import DaySection from './DaySection'
import {weekStyles, dayStyles} from '../calendar/styles'


const ScheduleWeek = ({
  week,
  dateSetGroups,
  routineNamesColors,
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
    className={weekStyles(week) + " week" }>
    {week.map(day=>{
    const formattedDay = day.format('MM-DD-YYYY')
    const daySetGroups = dateSetGroups[formattedDay] && isSingleRoutine 
    ? dateSetGroups[formattedDay].filter(sg => sg.routine === routine._id)
    : dateSetGroups[formattedDay]

    return daySetGroups ?
      <div
      onClick={() => handleDayClick(daySetGroups, formattedDay)}
      key={day._d}
      className={dayStyles(day, value) + " day"}>
        <p>{day.format("D")}</p>
        {daySetGroups &&
        <DaySection
        showEditLink={showEditLink}
        windowSize={{height, width}}
        routineNamesColors={routineNamesColors}
        dateSetGroups={daySetGroups} />}
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
  routineNamesColors: state.routineReducer.routineNamesColors,
  userRoutines: state.routineReducer.userRoutines,
  userId: state.userReducer.user._id
})


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleWeek)