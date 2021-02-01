import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {setCurrentExerciseSet, saveExerciseSetChanges} from '../../1_Actions/exerciseSetActions'
import {pathConstructor} from './pathConstructor'
import {selectStyles} from './selectStyles'
import {Link, useParams, useHistory} from 'react-router-dom'
import NavLink from 'react-bootstrap/NavLink'
import Select, {components} from 'react-select'
import Button from 'react-bootstrap/Button'
import {EyeIcon, PointLeftIcon} from '../icons/Icons'

export const ExecuteSetNavs = ({
  currentExerciseSets,
  currentExerciseSet,
  setCurrentExerciseSet,
  routineNamesColors,
  setInstructionShow,
  instructionShow,
  sessionSaved
}) => {
  
  const routineColor = routineNamesColors[currentExerciseSet.routine].color ? routineNamesColors[currentExerciseSet.routine].color : 'var(--routine-red)'


  const params = useParams()
  const history = useHistory()

  const {setDate, routineName, setGroupId, order} = params
  const currentPath = pathConstructor(setDate, routineName, currentExerciseSet.set_group, currentExerciseSet)
  const currentExerciseName = currentExerciseSet.exercise.name ? currentExerciseSet.exercise.name : 'no name'
 
  const selectOptions =
  currentExerciseSets
  .sort((a, b) => a.order - b.order)
  .map(set => set.exercise.name ? 
    {value: pathConstructor(setDate, routineName, set.set_group, set), label: `Set ${set.order + 1} - ${set.exercise.name}`} : 
    {value: pathConstructor(setDate, routineName, set.set_group, set), label: `Set ${set.order + 1}` }
  )

  const [currentOrderNum, setCurrentOrderNum] = useState(JSON.parse(order))
  const currentSelectValue = {vlaue: currentPath, label: `Set ${currentOrderNum + 1} - ${currentExerciseName}`}
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


  const newNextPath = nextSet && pathConstructor(setDate, routineName, setGroupId, nextSet)

  setNextPath(newNextPath)

  const newPrevPath = prevSet && pathConstructor(setDate, routineName, setGroupId, prevSet)

  setPrevPath(newPrevPath)


  }, [currentOrderNum])


  const handleSetSelect = (selectObj) => {
    history.push(selectObj.value)
  }

  const controlStyles = {
    borderRadius: '4px',
    padding: '10px',
    color: routineColor,
    border: `1px solid ${routineColor}`
  };

  const ControlComponent = props => (
    <div style={controlStyles}>
      {<p>{routineNamesColors[currentExerciseSet.routine].name}</p>}
      <components.Control {...props} />
    </div>
  );


  return (
    <div className="ex-set-navs">

      {!sessionSaved && 
        
        <div className='instruction-btn-container'>

          <Button
            size='sm'
            block
            variant={instructionShow ? 'outline-success' : 'outline-info'}
            onClick={() => setInstructionShow(!instructionShow)}>
            {
            instructionShow ? 
            <div 
            className='btn-text-container'>
              <PointLeftIcon />&nbsp; Back to record
            </div>
            : 
            <div 
            className='btn-text-container'>
              <EyeIcon />&nbsp; Instructions
            </div>}

          </Button>

        </div>}

        {!instructionShow && 
        <div className='navs-bottom'>
          <div className="select-container">
            <Select
              styles={selectStyles}
              value={currentSelectValue}
              components={{Control: ControlComponent}}
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
        </div>}

    </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  currentRoutine: state.routineReducer.currentRoutine,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  userRoutines: state.routineReducer.userRoutines,
  routineNamesColors: state.routineReducer.routineNamesColors
})

const mapDispatchToProps = {
  setCurrentExerciseSet,
  saveExerciseSetChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSetNavs)
