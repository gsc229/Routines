import React from 'react'
import {isDev} from '../../config/config'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {setCurrentExerciseSets} from '../../1_Actions/exerciseSetActions'
import SetGroupCard from './SetGroupCard'

export const CurrentSetGroups = ({
  setCurrentExerciseSets,
  currentSetGroups,
  userRoutines,
  setCurrentSetGroup

}) => {
  

  const history = useHistory()
  const handleCardClick = (setGroup) => {
    const routine = userRoutines.find(routine => routine._id === setGroup.routine)
    const setGroupExSets = routine.exercise_sets.filter(set => set.set_group === setGroup._id)
    const firstSet = setGroupExSets[0]
    const path = '/execute-sets/'
    .concat(`${routine.slug ? routine.slug : routine.name}/`)
    .concat(`${setGroup._id}/`)
    .concat(`${firstSet.exercise.name ? firstSet.exercise.name.replace(/\s/g, '') : firstSet.exercise._id}/`)
    .concat(`${setGroup.order}`)

    history
    .push(path)

    setCurrentSetGroup(setGroup)
    setCurrentExerciseSets(setGroupExSets)

  }

  return (
    <div className='current-sets'>
      <div className="sets-bank">
        {currentSetGroups.length > 0 && currentSetGroups.map(setGroup => 
          <SetGroupCard 
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
  setCurrentExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSetGroups)
