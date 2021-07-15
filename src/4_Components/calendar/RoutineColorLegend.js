import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {changeColor, saveRoutineChanges} from '../../1_Actions/routineActions'
import {HuePicker} from 'react-color'
import Link from 'react-bootstrap/NavLink'



export const RoutineColorLegend = ({
  isSingleRoutine=false,
  routineNamesColorsStartDates,
  changeColor,
  currentRoutine,
  saveRoutineChanges
}) => {

  const [showPicker, setShowPicker] = useState(false)
  const [initialNamesColors, setInitialNamesColors] = useState(routineNamesColorsStartDates)

  useEffect(() => {
    if(isSingleRoutine && currentRoutine && currentRoutine._id){
      setInitialNamesColors({ [currentRoutine._id]: routineNamesColorsStartDates[currentRoutine._id] })
    } else{
      setInitialNamesColors(routineNamesColorsStartDates)
    }

  }, [showPicker])

  
  const persistColorChanges = async(routineId) => {
    if(initialNamesColors[routineId].color !== routineNamesColorsStartDates[routineId].color){
      const saveColorResponse =  await saveRoutineChanges(routineId, {color: routineNamesColorsStartDates[routineId].color })
      if(!saveColorResponse.success){
        return changeColor({
          ...initialNamesColors,
          [routineId]: initialNamesColors[routineId]
        })
      }
      setInitialNamesColors(routineNamesColorsStartDates)
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
      setShowPicker(routineId)
    }
  }


  const handleColorChange = (color, routineId) => {
    changeColor({
      ...routineNamesColorsStartDates,
      [routineId]: {
        ...routineNamesColorsStartDates[routineId],
        color: color.hex
      }
    })
  }

  return (
    <div className="routine-color-legend">
       <div className={`legend-wrapper ${showPicker  && 'wrapper-showing-picker'}`}>
        {Object.keys(initialNamesColors)
        .map(routineId => 
        <div
        key={`legend-${routineId}`}
        className={`name-and-slider-container ${showPicker  && 'name-and-slider-container-showing-picker'}`}>

          <div className='name-and-day-marker'>
            {routineNamesColorsStartDates[routineId].name}: 
            <div
            onClick={() => handleShowPicker(routineId)}
            style={{backgroundColor: routineNamesColorsStartDates[routineId].color}} 
            className="day-marker">
            </div>
          </div> 
          
          {showPicker === routineId && 
          <div
          className={`slider-container ${showPicker === routineId && 'slider-container-showing-picker'}`}>
            <Link  
            onClick={() => handleDoneClick(routineId)}>
              Done
            </Link>
            <HuePicker
            color={routineNamesColorsStartDates[routineId].color} 
            onChangeComplete={(color) => handleColorChange(color, routineId)} />
          </div>}
        </div>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines,
  routineNamesColorsStartDates: state.routineReducer.routineNamesColorsStartDates,
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  changeColor,
  saveRoutineChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineColorLegend)
