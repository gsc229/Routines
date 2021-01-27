import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {fetchRoutines} from '../../1_Actions/routineActions'
import {setCurrentSetGroups} from '../../1_Actions/setGroupActions'
import moment from 'moment'
import buildCalendar from './build'
import mapSetGroupsToDates from './mapSetGroupsToDates'
import {dayStyles, beforeToday, weekStyles} from '../calendar/styles'
import CalendarHeader from '../calendar/CalendarHeader'
import DaySection from './DaySection'
import DarkSpinner from '../spinners/DarkSpinner'
import {useWindowSize} from '../../custom_hooks/useWindowSize'

const ScheduleCalendar = ({
  className,
  fetchRoutines,
  userId,
  userRoutines,
  routineNamesColors,
  crudingRoutine,
  setCurrentSetGroups
}) => {

  const history = useHistory()
  const [dateSetGroups, setDateSetGroups] = useState({})
  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())
  const{width} = useWindowSize()

  useEffect(() => {
    const fetchUserRoutines = async () => {
      await fetchRoutines(`?user=${userId}&populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`)
    }
    fetchUserRoutines()
  }, [])

  useEffect(() => {  
    userRoutines && setDateSetGroups(mapSetGroupsToDates(userRoutines))
  }, [userRoutines])

  useEffect(()=>{
    userRoutines && setCalendar(buildCalendar(value, userRoutines))
  },[value, userRoutines])


  // controls font size for different viewport sizes
  // Takes the viewport widths in pixels and the font sizes in rem
  function clampBuilder( minWidthPx, maxWidthPx, minFontSizeRem, maxFontSizeRem ) {
    const root = document.querySelector( "html" );
    const pixelsPerRem = Number( getComputedStyle( root ).fontSize.slice( 0,-2 ) );
  
    const minWidth = minWidthPx / pixelsPerRem;
    const maxWidth = maxWidthPx / pixelsPerRem;
  
    const slope = ( maxFontSizeRem - minFontSizeRem ) / ( maxWidth - minWidth );
    const yAxisIntersection = -minWidth * slope + minFontSizeRem
  
    return `clamp( ${ minFontSizeRem }rem, ${ yAxisIntersection }rem + ${ slope * 100 }vw, ${ maxFontSizeRem }rem )`;
  }

  const handleDayClick = (setGroups) => {
    history.push('/execute-sets')
    setCurrentSetGroups(setGroups)
  }


  return (
    <div className='schedule-wrapper'>
      {crudingRoutine === 'fetching-routines' && <DarkSpinner text='Loading Schedule...' />}
      {!crudingRoutine && 
      <div
      style={{fontSize: clampBuilder(400, 1200, .6, 1)}}
      className={`schedule-page-calendar ${className}`}>
        <CalendarHeader
        routineNamesColors={routineNamesColors}
        value={value} 
        setValue={setValue}/>      
        {
        calendar.map((week, index) => 
          <div 
          key={`schedule-calendar-week-${index + 1}`}
          className='schedule-week-container'>
            <h6
            style={{fontSize: clampBuilder(400, 1200, .6, .8)}}
            className="view-week-btn">View Week</h6>
            {/* {isDev && <h6>WEEK WIDTH: {weekWidth} &nbsp; DAY WIDTH: {dayWidth} WINDOW: {width}</h6> } */}
            <div 
            key={index} 
            className={weekStyles(week) + " week" }>
            {week.map(day=>{
            
            const dayHasSets = dateSetGroups[day.format('MM-DD-YYYY')]
            return dayHasSets ?
              <div
              onClick={() => handleDayClick(dateSetGroups[day.format('MM-DD-YYYY')])}
              key={day._d}
              className={dayStyles(day, value) + " day"}>
                <p>{day.format("D")}</p>
                {dateSetGroups && dateSetGroups[day.format('MM-DD-YYYY')] &&
                <DaySection
                routineNamesColors={routineNamesColors}
                dateSetGroups={dateSetGroups[day.format('MM-DD-YYYY')]} />}
                {width >= 400 &&
                <div
                onClick={() => handleDayClick(dateSetGroups[day.format('MM-DD-YYYY')])} 
                style={{fontSize: clampBuilder(400, 1200, .6, 1)}}
                className="execute-sets">Execute</div>}
              </div>
            :
            <div
              key={day._d}
              className={dayStyles(day, value) + " day day-no-sets"}>
                <p>{day.format("D")}</p>
            </div>
            })}
    
          </div>
          </div>)
        }
      </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines,
  routineNamesColors: state.routineReducer.routineNamesColors,
  userId: state.userReducer.user._id,
  crudingRoutine: state.routineReducer.crudingRoutine
})


const mapDispatchToProps = {
  fetchRoutines,
  setCurrentSetGroups
}



export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCalendar)