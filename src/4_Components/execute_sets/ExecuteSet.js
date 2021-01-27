import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {isDev} from '../../config/config'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {Link, useParams} from 'react-router-dom'

export const ExecuteSet = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet,
  saveExerciseSetChanges
}) => {


  const params = useParams()
  console.log({params})

  useEffect(() => {
    setCurrentExerciseSet(currentExerciseSets.find(set => set.order === JSON.parse(params.order)))
  }, [])


  return (
    <div className='execute-set'>
      {currentExerciseSets.map(set => set.exercise.name)}
      {isDev && <div style={{color: 'white'}}><br></br><br></br>{JSON.stringify(currentExerciseSets, null, 2)}</div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  setCurrentExerciseSet,
  saveExerciseSetChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSet)
