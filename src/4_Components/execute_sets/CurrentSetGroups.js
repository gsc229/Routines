import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {isDev} from '../../config/config'
import { useHistory, useParams } from 'react-router-dom'
import {pathConstructor} from './pathConstructor'
import { setCurrentRoutine } from '../../1_Actions/routineActions'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {setCurrentExerciseSet, setCurrentExerciseSets} from '../../1_Actions/exerciseSetActions'
import {PointLeftIcon} from '../icons/Icons'
import SetGroupCard from './SetGroupCard'

export const CurrentSetGroups = ({
  setCurrentExerciseSets,
  setCurrentExerciseSet,
  setCurrentRoutine,
  currentSetGroups,
  userRoutines,
  setCurrentSetGroup,
  setCurrentPage
}) => {
  

  const history = useHistory()
  const params = useParams()

  const handleCardClick = (setGroup) => {
    console.log({setGroup})
    const routine = userRoutines.find(routine => routine._id === setGroup.routine)
    const routineName = routine.slug ? routine.slug : routine.name
    const setGroupExSets = routine.exercise_sets.filter(set => set.set_group === setGroup._id)
    const firstSet = setGroupExSets.find(set => set.order === 0) || setGroupExSets[0]
    console.log({firstSet, setGroupExSets})
    const path =  pathConstructor( params.setDate, routineName, setGroup._id, firstSet)
    history
    .push(path)
    setCurrentRoutine(routine)
    setCurrentSetGroup(setGroup)
    setCurrentExerciseSets(setGroupExSets)
    setCurrentExerciseSet(firstSet)

  }

  useEffect(() => {
    setCurrentPage('all-set-groups')
  }, [])

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
      {/* {isDev && <p style={{color: 'white'}}>{JSON.stringify(currentSetGroups, null, 2)}</p>} */}
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
