import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import { clearCurrentExerciseSet } from '../../../1_Actions/exerciseSetActions'
import { clearExerciseSearchResults } from '../../../1_Actions/exerciseActions'
import SetTypeExplanation from './SetTypeExplanation'
import SetGroupSearchExercise from '../2_set_group_bank/SetGroupSearchExercise'
import SgNameInputForm from './SgNameInputForm'
import StepNavs from './StepNavs'
import SelectTypeTabs from './SelectTypeTabs'

export const CreateSetGroupSteps = ({
  currentSetGroup,
  currentStep,
  currentExerciseSets,
  localWritingCreateSetGroupData,
  clearCurrentExerciseSet,
  clearExerciseSearchResults
}) => {

  const {set_group_type} = currentSetGroup

  useEffect(() => {

    if(currentExerciseSets.length > 0){
      localWritingCreateSetGroupData('currentStep', 'choose-exercise')
    }

    clearCurrentExerciseSet()
    clearExerciseSearchResults()
  }, [])

  return (
    <div className='create-set-group-steps'>
      <SgNameInputForm />
      <SelectTypeTabs />
      <SetTypeExplanation type={set_group_type} />
      <StepNavs />
      {currentStep === 'choose-exercise' && <SetGroupSearchExercise />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentStep: state.setGroupReducer.createSetGroupData.currentStep,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  localWritingCreateSetGroupData,
  clearCurrentExerciseSet,
  clearExerciseSearchResults
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupSteps)
