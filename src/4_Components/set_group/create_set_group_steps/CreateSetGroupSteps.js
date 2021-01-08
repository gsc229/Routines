import React from 'react'
import { connect } from 'react-redux'
import SetTypeExplanation from './SetTypeExplanation'
import SetGroupSearchExercise from '../set_group_search_exercise/SetGroupSearchExercise'
import PreviewSetGroup from '../preview_set_group/PreviewSetGroup'
import SetGroupInfoForm from '../form_create_set_group/SetGroupInfoForm'
import StepNavs from './StepNavs'

export const CreateSetGroupSteps = ({
  currentSetGroup,
  currentStep
}) => {

  const {set_group_type} = currentSetGroup


  return (
    <div className='create-set-group-steps'>
      <SetTypeExplanation type={set_group_type} />
      <StepNavs />
      {currentStep === 'choose-exercise' && <SetGroupSearchExercise />}
      {currentStep === 'preview-set-group' && <PreviewSetGroup />}
      {currentStep === 'enter-info' && <SetGroupInfoForm />}
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
