import React from 'react'
import {isDev} from '../../config/config'
import { connect } from 'react-redux'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import SetGroupCard from './SetGroupCard'

export const CurrentSets = ({
  currentSetGroups,
  setCurrentSetGroup,
  setCurrentStep,
  steps
}) => {


  const handleCardClick = (setGroup) => {
    setCurrentSetGroup(setGroup)
    setCurrentStep(steps[1])
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
  currentSetGroups: state.setGroupReducer.currentSetGroups
})

const mapDispatchToProps = {
  setCurrentSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSets)
