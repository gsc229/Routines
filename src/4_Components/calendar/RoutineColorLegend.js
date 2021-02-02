import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {changeColor, saveRoutineChanges} from '../../1_Actions/routineActions'
import {updateRoutine} from '../../3_APIs/routinesApi'
import {SliderPicker, HuePicker} from 'react-color'
import Link from 'react-bootstrap/NavLink'



export const RoutineColorLegend = ({
  isSingleRoutine=false,
  routineNamesColors,
  changeColor,
  currentRoutine,
  saveRoutineChanges
}) => {

  const [showPicker, setShowPicker] = useState(false)
  const [initialNamesColors, setInitialNamesColors] = useState(routineNamesColors)

  useEffect(() => {
    if(isSingleRoutine && currentRoutine && currentRoutine._id){
      setInitialNamesColors({ [currentRoutine._id]: routineNamesColors[currentRoutine._id] })
    } else{
      setInitialNamesColors(routineNamesColors)
    }

  }, [showPicker])

  
  const persistColorChanges = async(routineId) => {
    if(initialNamesColors[routineId].color !== routineNamesColors[routineId].color){
      const saveColorResponse =  await saveRoutineChanges(routineId, {color: routineNamesColors[routineId].color })
      if(!saveColorResponse.success){
        return changeColor({
          ...initialNamesColors,
          [routineId]: initialNamesColors[routineId]
        })
      }
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
       <div className='legend-wrapper'>
        {Object.keys(initialNamesColors)
        .map(routineId => 
        <div
        key={`legend-${routineId}`}
        className={`name-and-slider-container ${showPicker === routineId && 'showing-picker'}`}>

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
            <Link  
            onClick={() => handleDoneClick(routineId)}>
              Done
            </Link>
            <HuePicker
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
