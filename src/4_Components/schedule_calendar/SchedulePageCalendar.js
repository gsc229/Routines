import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import {fetchRoutines} from '../../1_Actions/routineActions'
import moment from 'moment'
import buildCalendar from '../calendar/build'
import {dayStyles, beforeToday, weekStyles} from '../calendar/styles'
import CalendarHeader from '../calendar/CalendarHeader'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import RoutineSections from './RoutineSections'

const ScheduleCalendar = ({
  className,
  fetchRoutines,
  userId,
  userRoutines
}) => {
  const dayRef = useRef(null)
  const [weekWidth, setWeekWidth] = useState('')
  const [dayWidth, setDayWidth] = useState('')
  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())
  const [fontSize, setFontSize] = useState('12px')
  const {width} = useWindowSize()

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

  useLayoutEffect(() => {
    const dayEle = document.querySelector('.day')
    const weekContainerEle = document.querySelector('.week')
    if(dayRef.current){
      const dayEleWidth = dayEle && JSON.parse(getComputedStyle(dayEle).width.replace(/[px]/g, ''))
      const weekContEleWidth = weekContainerEle && JSON.parse(getComputedStyle(weekContainerEle).width.replace(/[px]/g, ''))
      setDayWidth(dayEleWidth)
      setWeekWidth(weekContEleWidth)
    }
    setFontSize(clampBuilder(350, 1200, .6, 1.2))
  }, [width])

  useEffect(()=>{
    setCalendar(buildCalendar(value))
    fetchRoutines(`?user=${userId}&populate_one=weeks`)
  },[value])


  return (
    <div 
    style={{fontSize: fontSize}}
    className={`schedule-page-calendar ${className}`}>
      <CalendarHeader 
      value={value} 
      setValue={setValue}/>      
      {
      calendar.map((week, index) => 
        <div className='schedule-week-container'>
          <h6 
          style={{fontSize: fontSize}}
          className="view-week-btn">View</h6>
          <h6>WEEK WIDTH: {weekWidth} &nbsp; DAY WIDTH: {dayWidth} </h6> 
          <div 
          key={index} 
          className={weekStyles(week) + " week" }>
          <RoutineSections />   
          {week.map(day=> 
          <div
          ref={dayRef}
          key={day._d}
          style={{height: `${dayWidth}px`}}
          onClick={() => !beforeToday(day) && setValue(day)}
          className={dayStyles(day, value) + " day"}>
            <p>{day.format("D")}</p>
            
          </div>
          )}
  
        </div>
        </div>)
      }
      <div style={{color: 'white'}}>{JSON.stringify(userRoutines, '', 2)}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    userRoutines: state.routineReducer.userRoutines,
    userId: state.userReducer.user._id
  }
}

const mapDispatchToProps = {
  fetchRoutines
}



export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCalendar)