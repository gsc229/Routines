import React from 'react'
import { connect } from 'react-redux'
import SetTypeExplanation from './SetTypeExplanation'

export const CreateSetGroupSteps = ({
  currentSetGroup
}) => {

  const {set_group_type} = currentSetGroup


  return (
    <div className='create-set-group-steps'>
      <SetTypeExplanation type={set_group_type} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupSteps)
