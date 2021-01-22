import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import moment from 'moment'
import buildCalendar from './build'
import {dayStyles, beforeToday, weekStyles} from './styles'
import CalendarHeader from './CalendarHeader'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import {useComputedStyles} from '../../custom_hooks/useEleComputedStyles'
import { RiHome6Fill } from 'react-icons/ri'

const Calendar = ({calendarId, className, routine}) => {
  const dayRef = useRef(null)
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

  useEffect(() => {
    const dayEle = document.querySelector('.day')
    if(dayRef.current){
      const dayEleWidth = dayEle && getComputedStyle(dayEle).width
      setDayWidth(dayEleWidth)
    }
    setFontSize(clampBuilder(350, 1200, .6, 1.2))
  }, [width])

  useEffect(()=>{
    setCalendar(buildCalendar(value))
  },[value])


  return (
    <div 
    style={{fontSize: fontSize}}
    className={`schedule-page-calendar ${className}`}>
      <CalendarHeader 
      value={value} 
      setValue={setValue} 
      routine={routine} />      
      {
      calendar.map((week, index) => 
        <div className='schedule-week-container'>
          <h6 
          style={{fontSize: fontSize}}
          className="view-week-btn">View</h6>
          <div 
          key={index} 
          className={weekStyles(week) + " week" }>
          
          {week.map(day=> 
          <div
          ref={dayRef}
          key={day._d}
          style={{height: `${dayWidth}`}}
          onClick={() => !beforeToday(day) && setValue(day)}
          className={dayStyles(day, value) + " day"}>
            <p>{day.format("D")}</p>
          </div>
          )}
  
        </div>
        </div>)
      }
    </div>
  )
}

export default Calendar