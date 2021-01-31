import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setCurrentSetGroups} from '../../1_Actions/setGroupActions'
import moment from 'moment'
import buildCalendar from './build'
import {dayStyles, beforeToday, weekStyles} from './styles'
import mapSetGroupsToDates from '../schedule_calendar/mapSetGroupsToDates'
import CalendarHeader from './CalendarHeader'
import RoutineColorLegend from './RoutineColorLegend'
import ScheduleWeek from './ScheduleWeek'
import {useWindowSize} from '../../custom_hooks/useWindowSize'

const SingleRoutineCalendar = ({
  className, 
  routine,
  isSingleRoutine=true,
  routineNamesColors,
  userRoutines,
  setCurrentSetGroups
}) => {

  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())
  const [dateSetGroups, setDateSetGroups] = useState({})
  const {height, width} = useWindowSize()

  useEffect(() => {  
    userRoutines && setDateSetGroups(mapSetGroupsToDates(userRoutines))
  }, [userRoutines])

  useEffect(()=>{
    userRoutines && setCalendar(buildCalendar(value, userRoutines))
  },[value, userRoutines])


  const handleDayClick = (setGroups, date) => {
    setCurrentSetGroups(setGroups)
  }

  return (
    <div className={`single-rouitne-calendar ${className}`}>

      <RoutineColorLegend 
      isSingleRoutine={false} />

      <CalendarHeader 
      singleRoutine={isSingleRoutine}
      value={value} 
      setValue={setValue} 
      routine={routine} />

      {
      calendar.map((week, index) => {
      return( 
      <ScheduleWeek 
      key={`week-${index}`} 
      value={value}
      height={height}
      width={width}
      routineNamesColors={routineNamesColors} 
      week={week} 
      dateSetGroups={dateSetGroups}
      handleDayClick={handleDayClick}
      routine={routine}
      isSingleRoutine={true}
      />
    )})}
    
    </div>
  )
}
const mapStateToProps = (state) => ({
  routineNamesColors: state.routineReducer.routineNamesColors,
  userRoutines: state.routineReducer.userRoutines,
  userId: state.userReducer.user._id
})


const mapDispatchToProps = {
  setCurrentSetGroups
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleRoutineCalendar)
