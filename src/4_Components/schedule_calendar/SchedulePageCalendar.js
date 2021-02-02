import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {fetchRoutines} from '../../1_Actions/routineActions'
import {setCurrentSetGroups} from '../../1_Actions/setGroupActions'
import fontClamp from '../../utils/clampBuilder'
import moment from 'moment'
import buildCalendar from './build'
import mapSetGroupsToDates from '../../4_Components/calendar/mapSetGroupsToDates'
import {dayStyles, beforeToday, weekStyles} from '../calendar/styles'
import CalendarHeader from '../calendar/CalendarHeader'
import RoutineColorLegend from '../calendar/RoutineColorLegend'
import ScheduleWeek from '../calendar/ScheduleWeek'
import DarkSpinner from '../spinners/DarkSpinner'
import {useWindowSize} from '../../custom_hooks/useWindowSize'


const ScheduleCalendar = ({
  className,
  fetchRoutines,
  userId,
  userRoutines,
  routineNamesColorsStartDates,
  crudingRoutine,
  setCurrentSetGroups,
  isSingleRoutine=false
}) => {

  const history = useHistory()
  const [datesSetGroups, setDatesSetGroups] = useState({})
  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())
  const {width, height} = useWindowSize()

  useEffect(() => {

    const fetchUserRoutines = async () => {
      await fetchRoutines(`?user=${userId}&populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`)
    }
    // test if the routines are flattened. If not it fetch them
    // notes: If it's not flattened it means routines may have been updated from manage routine operations
    //        Manage rotuine page operations do not fetch all routines as flattened. This schedule requres all rotuines to be flattend.
    if(!userRoutines[0].exercise_sets){
      fetchUserRoutines()
    }

  }, [])

  useEffect(() => {  
    userRoutines && setDatesSetGroups(mapSetGroupsToDates(userRoutines))
  }, [userRoutines])

  useEffect(()=>{
    userRoutines && setCalendar(buildCalendar(value, userRoutines))
  },[value, userRoutines])

  const handleDayClick = (setGroups, date) => {
    history.push(`/execute-sets/${date}`)
    setCurrentSetGroups(setGroups)
    //return <Redirect to={`/execute-sets/${date}`} />
  }


  return (
    <div className='schedule-wrapper'>
      {crudingRoutine === 'fetching-routines' && <DarkSpinner text='Loading Schedule...' />}
      {!crudingRoutine && 
      <div
      style={{fontSize: fontClamp(400, 1200, .6, 1)}}
      className={`schedule-page-calendar ${className}`}>
        <RoutineColorLegend 
        isSingleRoutine={isSingleRoutine} />
        <CalendarHeader
        routineNamesColorsStartDates={routineNamesColorsStartDates}
        value={value} 
        setValue={setValue}/>      
        {
        calendar.map((week, index) => 
          <div 
          key={`schedule-calendar-week-${index + 1}`}
          className='schedule-week-container'>
            <ScheduleWeek 
            key={`week-${index}`} 
            value={value}
            height={height}
            width={width}
            routineNamesColorsStartDates={routineNamesColorsStartDates} 
            week={week} 
            datesSetGroups={datesSetGroups}
            handleDayClick={handleDayClick}
            />
          </div>)
        }
      </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines,
  routineNamesColorsStartDates: state.routineReducer.routineNamesColorsStartDates,
  userId: state.userReducer.user._id,
  crudingRoutine: state.routineReducer.crudingRoutine
})


const mapDispatchToProps = {
  fetchRoutines,
  setCurrentSetGroups
}



export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCalendar)