import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {isDev} from '../../config/config'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {Link, useParams} from 'react-router-dom'
import NavLink from 'react-bootstrap/NavLink'

export const ExecuteSet = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet
}) => {
  


  const params = useParams()
  const {routineName, setGroupId, order} = params
  const [currentOrderNum, setCurrentOrderNum] = useState(JSON.parse(order))
  const [nextPath, setNextPath] = useState()
  const [prevPath, setPrevPath] = useState()
  const nextSet = currentExerciseSets.find(set => set.order === currentOrderNum + 1)
  const prevSet = currentOrderNum > 0 ? currentExerciseSets.find(set => set.order === currentOrderNum - 1) : null


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

  const newPrevPath = prevSet &&
  '/execute-sets/'
  .concat(`${routineName}/`)
  .concat(`${setGroupId}/`)
  .concat(`${prevSet.exercise.name ? prevSet.exercise.name.replace(/\s/g, '') : prevSet.exercise._id}/`)
  .concat(`${prevSet.order}`) 
  
  setPrevPath(newPrevPath)


  }, [currentOrderNum])


  return (
    <div className='execute-set'>
      <div className="ex-set-navs">
        <div className='link-container'>
          <NavLink
          disabled={!prevSet}
          as={Link}
          to={prevPath || 'nowhere'} >
            Previous Exercise
          </NavLink>
        </div>
        <div className='link-container'>
          <NavLink
          disabled={!nextSet}
          as={Link}
          to={nextPath || 'nowhere'}>
            Next Exercise
          </NavLink>
        </div>
      </div>
      <div className="execute-set-card">
        {currentExerciseSet.exercise.name|| 'No Name'}
      </div>




      {isDev && <div style={{color: 'white'}}><br></br><br></br>{JSON.stringify(currentExerciseSet, null, 4)}</div>}
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
