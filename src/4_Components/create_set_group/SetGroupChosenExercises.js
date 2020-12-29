import React from 'react'
import { connect } from 'react-redux'
import ExerciseSetCard from '../card_exercise_set/ExerciseSetCard'

export const SetGroupChosenExercises = ({
  chosenExercises
}) => {

  
  return (
    <div className='chosen-exercieses-bank'>
      {chosenExercises.length > 0  && <h5>Chosen Exercises:</h5>}
      {chosenExercises.length > 0 && chosenExercises.map(exercise => {
        <ExerciseSetCard exercise={exercise} />
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupChosenExercises)
