import React from 'react'
import { connect } from 'react-redux'
import SelectTypeForm from '../form_create_set_group/SelectTypeForm'
import SetGroupSearchExercise from '../set_group_search_exercise/SetGroupSearchExercise'

export const CreateSetGroup = ({
  currentStep
}) => {
  return (
    <div>
      {currentStep === 'choose-type' && <SelectTypeForm />}
      {currentStep === 'choose-exercise' && <SetGroupSearchExercise />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentStep: state.setGroupReducer.createSetGroupData.currentStep
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroup)
