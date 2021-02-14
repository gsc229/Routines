import React from 'react'
import {VscGripper} from 'react-icons/vsc'


const ExerciseSet = ({exercise_set, width}) => {

  const {exercise} = exercise_set
  console.log({exercise_set})
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

export default ExerciseSet
