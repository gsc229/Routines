import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import DaySection from './DaySection'
import {weekStyles, dayStyles} from '../calendar/styles'
import moment from 'moment'
import fontSizeClamp from '../../utils/clampBuilder'

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

  const getStartMarkers = (formattedDay) => {

    const startIcons = []

    Object.keys(routineNamesColorsStartDates)
    .map(idKey => {
      const formattedStart = moment(routineNamesColorsStartDates[idKey].start_date).format('MM-DD-YYYY')
      if(formattedStart === formattedDay){
        startIcons.push(
        <div 
        style={{
        width: 'fit-content',
        color: routineNamesColorsStartDates[idKey].color, 
        overflow: 'hidden', 
        fontSize: fontSizeClamp(400, 1000, .6, 1)}}
        className="start-date">
          <p>S</p>
        </div>
        )
      }
    })

    return(
      <div 
      style={{display: 'flex', flexWrap: 'wrap'}}
      className='starts-container'>
        {startIcons.map(div => div)}
      </div>
    )
  }
  
  return (
    <div 
    className={" week" }>
    {week.map((day, index)=>{
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
        {getStartMarkers(formattedDay)}
      </div>
    : // ↑ Day has sets ↑ - ↓ Day has no sets ↓ 
      <div
        key={day._d}
        className={dayStyles(day, value) + " day day-no-sets"}>
          <p>{day.format("D")}</p>
          {getStartMarkers(formattedDay)}
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