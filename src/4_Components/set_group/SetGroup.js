import React from 'react'
import { connect } from 'react-redux'
import {getExSetTarget} from './setGroupHelpers'

export const SetGroup = ({set_group}) => {

  const exercise_sets = set_group.exercise_sets

  return (
    <div className='set-group'>
      <h6>Set Group {set_group.name &&  
      `- ${set_group.name} `}- 
      Day: {set_group.day} - 
      Day Num: {set_group.day_number} 
      Week Num: {set_group.week_number}</h6>
      <h6>{set_group.set_group_type}</h6>
      <p>{set_group._id}</p>
      <ul>
        {exercise_sets.map(ex_set=> <li key={ex_set._id}>{ex_set.exercise.name} - targets: {getExSetTarget(ex_set)}</li>)}
      </ul>
      {JSON.stringify(set_group.order, '', 2)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroup)
