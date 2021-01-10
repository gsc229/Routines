import React, {useState} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {minAndMaxAllowedExercises, getSetComboType} from '../createSetGroupHelpers'
import SetCardWithDetailInputs from '../3_set_card_with_input_details/SetCardWithDetailInputs'

export const EnterSetInfo = ({
  chosenExercises,
  currentSetGroup,
  chosenExerciseIndex,
  writingCreateSetGroupData
}) => {


  const {set_group_type} = currentSetGroup
  const set_combo_type = getSetComboType(set_group_type)
  return (
    <div>
      {set_combo_type !== "single" && <h5>Enter Set {chosenExerciseIndex + 1} Info:</h5>}
      {set_combo_type === "single" && <h5>Enter Set Group Info:</h5>}
      <SetCardWithDetailInputs exercise={chosenExercises[chosenExerciseIndex]} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  chosenExerciseIndex: state.setGroupReducer.createSetGroupData.chosenExerciseIndex,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterSetInfo)
