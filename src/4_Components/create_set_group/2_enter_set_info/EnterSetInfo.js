import React, {useState} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {minAndMaxExercisesAllowed, getSetComboType} from '../createSetGroupHelpers'
import SetCardWithDetailInputs from '../3_set_card_with_input_details/SetCardWithDetailInputs'

export const EnterSetInfo = ({
  chosenExercises,
  currentSetGroup,
  chosenExerciseIndex,
  writingCreateSetGroupData
}) => {

  const [currIndex, setCurrIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState()
  const [prevIndex, setPrevIndex] = useState()
  const {set_group_type} = currentSetGroup
  const setComboType = getSetComboType(set_group_type)

  return (
    <div>
      {setComboType !== "single" && <h5>Enter Set {currIndex + 1} Info:</h5>}
      {setComboType === "single" && <h5>Enter Set Group Info:</h5>}
      <SetCardWithDetailInputs exercise={chosenExercises[currIndex]} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  chosenExerciseIndex: state.setGroupReducer.chosenExerciseIndex,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterSetInfo)
