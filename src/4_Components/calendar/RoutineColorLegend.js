import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {changeColor} from '../../1_Actions/routineActions'
import {updateRoutine} from '../../3_APIs/routinesApi'
import {SliderPicker} from 'react-color'
import Link from 'react-bootstrap/NavLink'



export const RoutineColorLegend = ({
  isSingleRoutine=false,
  routineNamesColors,
  changeColor,
  currentRoutine
}) => {

  
  

  const [showPicker, setShowPicker] = useState(false)
  const [initialNamesColors, setInitialNamesColors] = useState(routineNamesColors)

  useEffect(() => {
    if(isSingleRoutine && currentRoutine && currentRoutine._id){
      setInitialNamesColors({ [currentRoutine._id]: routineNamesColors[currentRoutine._id] })
    }

  }, [])

  
  const persistColorChanges = (routineId) => {
    if(initialNamesColors[routineId].color !== routineNamesColors[routineId].color){
      updateRoutine(routineId, {color: routineNamesColors[routineId].color })
      setInitialNamesColors(routineNamesColors)
    }
  }

  const handleDoneClick = (routineId) => {
    persistColorChanges(routineId)
    setShowPicker(false)
  }

  const handleShowPicker =  (routineId) => {
    // same click to close
    if(routineId === showPicker){
      persistColorChanges(routineId)
      setShowPicker(false)
    // first open click
    } else if(!showPicker){
      setShowPicker(routineId)
    // change out routine click 
    } else{
      persistColorChanges(routineId)
      setShowPicker(false)
      setTimeout(() => { setShowPicker(routineId)}, 40)
    }
  }


  const handleColorChange = (color, routineId) => {
    console.log({routineNamesColors})
    changeColor({
      ...routineNamesColors,
      [routineId]: {
        ...routineNamesColors[routineId],
        color: color.hex
      }
    })
  }

  return (
    <div className="routine-color-legend">
        {/* <ChromePicker onChangeComplete={(color) => console.log({color})} /> */}
       <div className='legend-wrapper'>
        {Object.keys(initialNamesColors)
        .map(routineId => 
        <div
        key={`legend-${routineId}`}
        className={`header-name-color-container ${showPicker === routineId && 'showing-picker'}`}>
          {/* <ChromePickerModal
          currentColor={initialNamesColors[routineId].color}
          showPicker={showPicker} 
          setShowPicker={setShowPicker} 
          handleColorPick={(color) => handleColorChange(color, routineId)} /> */}

          <div className='name-and-day-marker'>
            {initialNamesColors[routineId].name}: 
            <div
            onClick={() => handleShowPicker(routineId)}
            style={{backgroundColor: initialNamesColors[routineId].color}} 
            className="day-marker">
            </div>
          </div> 
          
          {showPicker === routineId && 
          <div
          className={`slider-container ${showPicker === routineId && 'showing-picker-slider'}`}>
            <Link  onClick={() => handleDoneClick(routineId)}>Done</Link>
            <SliderPicker
            color={initialNamesColors[routineId].color} 
            onChangeComplete={(color) => handleColorChange(color, routineId)} />
          </div>}
        </div>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines,
  routineNamesColors: state.routineReducer.routineNamesColors,
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  changeColor
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineColorLegend)
