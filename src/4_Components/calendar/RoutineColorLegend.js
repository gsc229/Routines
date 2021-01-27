import React, {useState} from 'react'
import { connect } from 'react-redux'
import {changeColor, saveRoutineChanges} from '../../1_Actions/routineActions'
import {updateRoutine} from '../../3_APIs/routinesApi'
import {SliderPicker} from 'react-color'
import Link from 'react-bootstrap/NavLink'



export const RoutineColorLegend = ({
  singleRoutine=false,
  routineNamesColors,
  changeColor,
  currentRoutine,
  saveRoutineChanges
}) => {

  if(singleRoutine && currentRoutine && currentRoutine._id){
    routineNamesColors = { [currentRoutine._id]: routineNamesColors[currentRoutine._id] }
  }
  const [showPicker, setShowPicker] = useState(false)
  const [initialNamesColors, setInitialNamesColors] = useState(routineNamesColors)
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
      setTimeout(() => { setShowPicker(routineId)}, 50)
    }
  }


  const handleColorChange = (color, routineId) => {
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
        {Object.keys(routineNamesColors)
        .map(routineId => 
        <div
        key={`legend-${routineId}`}
        className={`header-name-color-container ${showPicker === routineId && 'showing-picker'}`}>
          {/* <ChromePickerModal
          currentColor={routineNamesColors[routineId].color}
          showPicker={showPicker} 
          setShowPicker={setShowPicker} 
          handleColorPick={(color) => handleColorChange(color, routineId)} /> */}

          <div className='name-and-day-marker'>
            {routineNamesColors[routineId].name}: 
            <div
            onClick={() => handleShowPicker(routineId)}
            style={{backgroundColor: routineNamesColors[routineId].color}} 
            className="day-marker">
            </div>
          </div> 
          
          {showPicker === routineId && 
          <div
          className={`slider-container ${showPicker === routineId && 'showing-picker-slider'}`}>
            <Link  onClick={() => handleDoneClick(routineId)}>Done</Link>
            <SliderPicker
            color={routineNamesColors[routineId].color} 
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
  changeColor,
  saveRoutineChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineColorLegend)
