import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import {fetchRoutines} from '../../1_Actions/routineActions'
import moment from 'moment'
import buildCalendar from './build'
import mapSetGroupsToDates from './mapSetGroupsToDates'
import {dayStyles, beforeToday, weekStyles} from '../calendar/styles'
import CalendarHeader from '../calendar/CalendarHeader'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import DaySection from './DaySection'
import DarkSpinner from '../spinners/DarkSpinner'


const ScheduleCalendar = ({
  className,
  fetchRoutines,
  userId,
  userRoutines,
  routineNamesColors,
  crudingRoutine
}) => {

  
  const dayRef = useRef(null)
  const [weekWidth, setWeekWidth] = useState('')
  const [dateSetGroups, setDateSetGroups] = useState({})
  const [dayWidth, setDayWidth] = useState(100)
  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())
  const [fontSize, setFontSize] = useState('12px')
  const {width} = useWindowSize()

  const dayEle = document.querySelector('.day')
  const weekContainerEle = document.querySelector('.week')

  useEffect(() => {
    const fetchUserRoutines = async () => {
      await fetchRoutines(`?user=${userId}&populate_one=weeks&populate_two=set_groups`)
    }

    fetchUserRoutines()
  }, [])

  useEffect(() => {  
    userRoutines && setDateSetGroups(mapSetGroupsToDates(userRoutines))
  }, [userRoutines])

  useEffect(()=>{
    userRoutines && setCalendar(buildCalendar(value, userRoutines))
  },[value])

  useEffect(() => {
    if(dayEle){
      const dayEleWidth = dayEle && JSON.parse(getComputedStyle(dayEle).width.replace(/[px]/g, ''))
      const weekContEleWidth = weekContainerEle && JSON.parse(getComputedStyle(weekContainerEle).width.replace(/[px]/g, ''))
      setDayWidth(dayEleWidth)
      setWeekWidth(weekContEleWidth)
    } else{
      const dayEleWidth = width * 0.0845
      const weekContEleWidth = weekContainerEle && JSON.parse(getComputedStyle(weekContainerEle).width.replace(/[px]/g, ''))
      setDayWidth(dayEleWidth)
      setWeekWidth(weekContEleWidth)
    }
    setFontSize(clampBuilder(350, 1200, .6, 1.2))
  }, [width, dayEle, weekContainerEle])

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

  console.log({calendar})

  return (
    <div className='schedule-wrapper'>
      {crudingRoutine === 'fetching-routines' && <DarkSpinner text='Loading Schedule...' />}
      {!crudingRoutine && 
      <div 
      style={{fontSize: fontSize}}
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
            style={{fontSize: '12px'}}
            className="view-week-btn">View Week</h6>
            {/* {isDev && <h6>WEEK WIDTH: {weekWidth} &nbsp; DAY WIDTH: {dayWidth} WINDOW: {width}</h6> } */}
            <div 
            key={index} 
            className={weekStyles(week) + " week" }>
            {week.map(day=> 
            <div
            ref={dayRef}
            key={day._d}
            style={{height: `${dayWidth}px`}}
            /* onClick={() => !beforeToday(day) && setValue(day)} */
            className={dayStyles(day, value) + " day"}>
              <p>{day.format("D")}</p>
              {dateSetGroups && dateSetGroups[day.format('MM-DD-YYYY')] &&
              <DaySection 
              routineNamesColors={routineNamesColors}
              dateSetGroups={dateSetGroups[day.format('MM-DD-YYYY')]} />}
            </div>
            )}
    
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
  fetchRoutines
}



export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCalendar)