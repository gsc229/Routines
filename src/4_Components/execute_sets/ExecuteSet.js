import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {isDev} from '../../config/config'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {Link, useParams} from 'react-router-dom'

export const ExecuteSet = ({
  currentExerciseSets,
  currentSetGroup,
  currentRoutine,
  currentExerciseSet,
  setCurrentExerciseSet,
  saveExerciseSetChanges
}) => {
  


  const params = useParams()
  const {routineName, setGroupId, order} = params
  const [currentOrderNum, setCurrentOrderNum] = useState(JSON.parse(order))
  const [nextPath, setNextPath] = useState()
  const nextSet = currentExerciseSets.find(set => set.order === currentOrderNum + 1)

  console.log({order, nextSet, currentExerciseSet})

  useEffect(() => {
    setCurrentOrderNum(JSON.parse(order))
  }, [order])
  
  
  useEffect(() => {
    if(currentExerciseSet.order !== currentOrderNum){
      setCurrentExerciseSet(currentExerciseSets.find(set => set.order === JSON.parse(order)))
    }


  const newNextPath = nextSet &&
  '/execute-sets/'
  .concat(`${routineName}/`)
  .concat(`${setGroupId}/`)
  .concat(`${nextSet.exercise.name ? nextSet.exercise.name.replace(/\s/g, '') : nextSet.exercise._id}/`)
  .concat(`${nextSet.order}`) 
  
  setNextPath(newNextPath)


  }, [currentOrderNum])


  return (
    <div className='execute-set'>
      <div className="ex-set-navs">
        {nextSet && 
        <Link 
        to={nextPath}>
          Next Exercise
        </Link>}
      </div>
      <div className="execute-set-card">
        {currentExerciseSet.exercise.name|| 'No Name'}
      </div>




      {isDev && <div style={{color: 'white'}}><br></br><br></br>{JSON.stringify(currentExerciseSets, null, 4)}</div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  currentRoutine: state.routineReducer.currentRoutine,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  setCurrentExerciseSet,
  saveExerciseSetChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSet)
