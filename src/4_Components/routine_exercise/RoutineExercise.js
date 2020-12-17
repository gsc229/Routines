import React from 'react'

const RoutineExercise = ({routine_exercise, width}) => {

  const {exercise, day} = routine_exercise

  const getExerciseHeadingStyles = () => {

    if(width < 1500){
      return {fontSize: '20px'}
    }

    return {fontSize: '1.5vw'}
  }

  return (
    <div>
      <h5 style={getExerciseHeadingStyles()}>{exercise.name}</h5>
    </div>
  )
}

export default RoutineExercise
