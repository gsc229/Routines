import React from 'react'
import {VscGripper} from 'react-icons/vsc'


const RoutineExercise = ({routine_exercise, width}) => {

  const {exercise, day} = routine_exercise

  const getExerciseHeadingStyles = () => {

    if(width < 1500){
      return {fontSize: '20px'}
    }

    return {fontSize: '1.5vw'}
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h5 style={getExerciseHeadingStyles()}>{exercise.name}</h5>
      <VscGripper fontSize={30} />
    </div>
  )
}

export default RoutineExercise
