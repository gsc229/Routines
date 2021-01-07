import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import SgNameInputForm from './SgNameInputForm'
import SelectTypeTabs from './SelectTypeTabs'
import SetGroupSearchExercise from '../set_group_search_exercise/SetGroupSearchExercise'
import PreviewSetGroup from '../preview_set_group/PreviewSetGroup'


export const CreateSetGroupTab = ({
  currentStep
}) => {
  return (
    <div className='create-set-group-tab'>
      <SgNameInputForm />
      <h5 className='quick-build-heading'>Quick Build: </h5>
      <SelectTypeTabs />
      {currentStep === 'choose-exercise' && <SetGroupSearchExercise />}
      {currentStep === 'preview-set-group' && <PreviewSetGroup />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentStep: state.setGroupReducer.createSetGroupData.currentStep
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupTab)
