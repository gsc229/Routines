import React from 'react'
import { connect } from 'react-redux'
import {isDev} from '../../config/config'
import { useHistory } from 'react-router-dom'
import {pathConstructor} from './pathConstructor'
import { setCurrentRoutine } from '../../1_Actions/routineActions'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {setCurrentExerciseSet, setCurrentExerciseSets} from '../../1_Actions/exerciseSetActions'
import SetGroupCard from './SetGroupCard'

export const CurrentSetGroups = ({
  setCurrentExerciseSets,
  setCurrentExerciseSet,
  setCurrentRoutine,
  currentSetGroups,
  userRoutines,
  setCurrentSetGroup

}) => {
  

  const history = useHistory()

  

  const handleCardClick = (setGroup) => {
    const routine = userRoutines.find(routine => routine._id === setGroup.routine)
    const routineName = routine.slug ? routine.slug : routine.name
    const setGroupExSets = routine.exercise_sets.filter(set => set.set_group === setGroup._id)
    const firstSet = setGroupExSets.find(set => set.order === 0)
    const path =  pathConstructor(routineName, setGroup._id, firstSet)

    history
    .push(path)
    console.log({routine, setGroupExSets, firstSet, path})
    setCurrentRoutine(routine)
    setCurrentSetGroup(setGroup)
    setCurrentExerciseSets(setGroupExSets)
    setCurrentExerciseSet(firstSet)

  }

  return (
    <div className='current-sets'>
      <div className="sets-bank">
        {currentSetGroups.length > 0 && currentSetGroups.map(setGroup => 
              
            <SetGroupCard
            key={setGroup._id}
            onClick={() => handleCardClick(setGroup)}
            setGroup={setGroup} />
            
        )}
      </div>
      {isDev && <p style={{color: 'white'}}>{JSON.stringify(currentSetGroups, null, 2)}</p>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroups: state.setGroupReducer.currentSetGroups,
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  setCurrentSetGroup,
  setCurrentExerciseSets,
  setCurrentExerciseSet,
  setCurrentRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSetGroups)
