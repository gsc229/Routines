import React from 'react'
import {VscGripper} from 'react-icons/vsc'


const RoutineExercise = ({routine_exercise, width}) => {

  const {exercise} = routine_exercise

  const getExerciseHeadingStyles = () => {

    return {
      fontSize: '15px',
      
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', border: '1px solid red'}}>
      <h5 style={getExerciseHeadingStyles()}>{exercise.name}</h5>
      <VscGripper fontSize={30} />
    </div>
  )
}

export default RoutineExercise
