import React from 'react'
import { connect } from 'react-redux'
import SetTypeExplanation from './SetTypeExplanation'
import SetGroupSearchExercise from '../2_set_group_search_exercise/SetGroupSearchExercise'
import PreviewSetGroup from '../2_preview_set_group/PreviewSetGroup'
import SetGroupInfoForm from '../2_form_create_set_group/SetGroupInfoForm'

import SgNameInputForm from './SgNameInputForm'
import StepNavs from './StepNavs'
import SelectTypeTabs from './SelectTypeTabs'
export const CreateSetGroupSteps = ({
  currentSetGroup,
  currentStep
}) => {

  const {set_group_type} = currentSetGroup


  return (
    <div className='create-set-group-steps'>
      <SgNameInputForm />
      <SelectTypeTabs />
      {currentStep === 'choose-type' &&  <SetTypeExplanation type={set_group_type} />}
      <StepNavs />
      {currentStep === 'choose-exercise' && <SetGroupSearchExercise />}
      {currentStep === 'enter-info' && <SetGroupInfoForm />}
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
