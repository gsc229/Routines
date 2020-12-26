import React from 'react'
import { connect } from 'react-redux'
import {getExSetTarget} from './setGroupHelpers'

export const SetGroup = ({set_group}) => {

  const exercise_sets = set_group.exercise_sets

  return (
    <div>
      <h6>Set Group {set_group.name &&  `- ${set_group.name} `}- {set_group.day}</h6>
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
