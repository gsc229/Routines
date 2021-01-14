import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import SetTypeExplanation from './SetTypeExplanation'
import SetGroupSearchExercise from '../2_set_group_search_exercise/SetGroupSearchExercise'
import PreviewSetGroup from '../2_preview_set_group/PreviewSetGroup'
import EnterSetInfo from '../2_enter_set_info/EnterSetInfo'
import SgNameInputForm from './SgNameInputForm'
import StepNavs from './StepNavs'
import SelectTypeTabs from './SelectTypeTabs'

export const CreateSetGroupSteps = ({
  currentSetGroup,
  currentStep,
  currentExerciseSets,
  writingCreateSetGroupData
}) => {

  const {set_group_type} = currentSetGroup

  useEffect(() => {
    
    if(currentExerciseSets.length > 0){
      writingCreateSetGroupData('currentStep', 'choose-exercise')
    }

  }, [])

  return (
    <div className='create-set-group-steps'>
      <SgNameInputForm />
      <SelectTypeTabs />
      <SetTypeExplanation type={set_group_type} />
      <StepNavs />
      {currentStep === 'choose-exercise' && <SetGroupSearchExercise />}
      {currentStep === 'enter-info' && <EnterSetInfo />}
      {currentStep === 'preview-set-group' && <PreviewSetGroup />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentStep: state.setGroupReducer.createSetGroupData.currentStep,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupSteps)
