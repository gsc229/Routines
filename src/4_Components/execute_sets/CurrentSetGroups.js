import React from 'react'
import {isDev} from '../../config/config'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
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
    const setGroupExSets = routine.exercise_sets.filter(set => set.set_group === setGroup._id)
    const firstSet = setGroupExSets.find(set => set.order === 0)
    const path = '/execute-sets/'
    .concat(`${routine.slug ? routine.slug : routine.name}/`)
    .concat(`${setGroup._id}/`)
    .concat(`${firstSet.exercise.name ? firstSet.exercise.name.replace(/\s/g, '') : firstSet.exercise._id}/`)
    .concat(`${firstSet.order}`)

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
