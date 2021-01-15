import React, {useState} from 'react'
import { connect } from 'react-redux'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {minAndMaxAllowedExercises, getSetComboType} from '../createSetGroupHelpers'
import SetCardWithDetailInputs from '../3_set_card_with_input_details/SetCardWithDetailInputs'

export const EnterSetInfo = ({
  currentExerciseSets,
  currentSetGroup,
  currentExerciseSetIndex,
  localWritingCreateSetGroupData
}) => {


  const {set_group_type} = currentSetGroup
  const set_combo_type = getSetComboType(set_group_type)
  return (
    <div>
      {set_combo_type !== "single" && <h5>Enter Set {currentExerciseSetIndex + 1} Info:</h5>}
      {set_combo_type === "single" && <h5>Enter Set Group Info:</h5>}
      <SetCardWithDetailInputs exercise={currentExerciseSets[currentExerciseSetIndex]} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentExerciseSetIndex: state.setGroupReducer.createSetGroupData.currentExerciseSetIndex,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterSetInfo)
