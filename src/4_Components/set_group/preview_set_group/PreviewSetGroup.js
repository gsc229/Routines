import React from 'react'
import { connect } from 'react-redux'
import {createSetGroup} from './previewSetGroupHelpers'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'
import {FaRegHandPointLeft} from 'react-icons/fa'

export const PreviewSetGroup = ({
  writingCreateSetGroupData,
  chosenExercises,
  currentSetGroup,
  createSetGroupData,
  currentExerciseSet
}) => {
  return (
    <div>
      <h1>Preview Set Group</h1>
      <Button 
      onClick={() => writingCreateSetGroupData('currentStep', 'choose-exercise')}>
        <FaRegHandPointLeft />&nbsp;
        Go back to choose exercises
      </Button>
      {JSON.
      stringify(
        createSetGroup(
        chosenExercises,
        currentSetGroup, 
        createSetGroupData,
        currentExerciseSet),'',2)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  chosenExercises: state.setGroupReducer.chosenExercises,
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSetGroup)
