import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {pathConstructor} from './pathConstructor'
import { setCurrentRoutine } from '../../1_Actions/routineActions'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {setCurrentExerciseSet, setCurrentExerciseSets} from '../../1_Actions/exerciseSetActions'
import SetGroupCard from './SetGroupCard'
import NoSetsModal from './NoSetsModal'

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

  const [modalShow, setModalShow] = useState({
    setGroup: '',
    routine: '',
    routineName: ''
  })


  const handleCardClick = (setGroup) => {

    const routine = userRoutines.find(routine => routine._id === setGroup.routine)
    const routineName = routine.slug ? routine.slug : routine.name
    const setGroupExSets = routine.exercise_sets.filter(set => set.set_group === setGroup._id)
    const firstSet = setGroupExSets.find(set => set.order === 0) || setGroupExSets[0]
    if(!firstSet){
      return setModalShow({
        setGroup,
        routine,
        routineName
      })
    }

    const path =  pathConstructor( params.setDate, routineName, setGroup._id, firstSet)
    history
    .push(path)
    setCurrentRoutine(routine)
    setCurrentSetGroup(setGroup)
    setCurrentExerciseSets(setGroupExSets)
    setCurrentExerciseSet(firstSet)
  }

  return (
    <div className='current-sets'>

      <div className="sets-bank">
        {currentSetGroups.length > 0 && currentSetGroups.map(setGroup => 
            
            <div className='sg-card-and-no-sg-modal-container'>
              <NoSetsModal 
              setGroup={modalShow.setGroup}
              routine={modalShow.routine}
              routineName={modalShow.routineName}
              modalShow={modalShow.setGroup._id === setGroup._id} 
              setModalShow={setModalShow} />
              <SetGroupCard
              key={setGroup._id}
              onClick={() => handleCardClick(setGroup)}
              setGroup={setGroup} />
            </div>

        )}
      </div>
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
