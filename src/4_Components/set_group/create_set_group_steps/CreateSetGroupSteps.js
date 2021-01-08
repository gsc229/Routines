import React from 'react'
import { connect } from 'react-redux'
import SetTypeExplanation from './SetTypeExplanation'
import SetGroupSearchExercise from '../set_group_search_exercise/SetGroupSearchExercise'
import PreviewSetGroup from '../preview_set_group/PreviewSetGroup'

export const CreateSetGroupSteps = ({
  currentSetGroup,
  currentStep
}) => {

  const {set_group_type} = currentSetGroup


  return (
    <div className='create-set-group-steps'>
      <SetTypeExplanation type={set_group_type} />
      {currentStep === 'choose-exercise' && <SetGroupSearchExercise />}
      {currentStep === 'preview-set-group' && <PreviewSetGroup />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentStep: state.setGroupReducer.createSetGroupData.currentStep
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupSteps)
