import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {isDev} from '../../config/config'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {pathConstructor} from './pathConstructor'
import {Link, useParams, useHistory} from 'react-router-dom'
import NavLink from 'react-bootstrap/NavLink'
import {PointLeftIcon} from '../icons/Icons'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

export const ExecuteSetNavs = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet
}) => {
  
  const params = useParams()
  const history = useHistory()
  const {routineName, setGroupId, order} = params
  const currentPath = pathConstructor(routineName, currentExerciseSet.set_group, currentExerciseSet)
  const currentExerciseName = currentExerciseSet.exercise.name ? currentExerciseSet.exercise.name : 'no name'
  console.log({currentPath, currentExerciseName})
  const [selectOptions, setSelectOptions] = useState(
    currentExerciseSets.map(set => set.exercise.name ? 
      {value: pathConstructor(routineName, set.set_group, set), label: set.exercise.name} : 
      {value: pathConstructor(routineName, set.set_group, set), label: `Set ${set.order}` })
  )
  
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


  const newNextPath = nextSet && pathConstructor(routineName, setGroupId, nextSet)

  setNextPath(newNextPath)

  const newPrevPath = prevSet && pathConstructor(routineName, setGroupId, prevSet)

  setPrevPath(newPrevPath)


  }, [currentOrderNum])


  const handleSetSelect = (selectObj) => {
    history.push(selectObj.value)
  }


  return (
    <div className="ex-set-navs">
      <div onClick={() => history.push('/execute-sets')}  className="back-to-set-groups-container">
        <PointLeftIcon />
        &nbsp; All Set Groups
      </div>
      <div className="select-container">
        <Select
          value={{vlaue: currentPath, label: currentExerciseName}}
          components={animatedComponents}
          placeholder='Select set...'
          onChange={handleSetSelect}
          options={selectOptions}
          autoFocus/>
      </div>
      <div className='links-container'>
        <div className='link-container'>
          <NavLink
          disabled={!prevSet}
          as={Link}
          to={prevPath || 'nowhere'} >
            Previous Set
          </NavLink>
        </div>
        <div className='link-container'>
          <NavLink
          disabled={!nextSet}
          as={Link}
          to={nextPath || 'nowhere'}>
            Next Set
          </NavLink>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSetNavs)
