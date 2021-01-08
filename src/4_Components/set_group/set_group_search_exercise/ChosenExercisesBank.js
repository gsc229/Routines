import React from 'react'
import { connect } from 'react-redux'
import {removeChosenExercise, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {FiMinusSquare} from 'react-icons/fi'
import {FaRegHandPointRight} from 'react-icons/fa'

export const ChosenExercisesBank = ({
  chosenExercises,
  currentSetGroup,
  removeChosenExercise,
  writingCreateSetGroupData
}) => {
  return (
    <Container 
    className='chosen-exercises-bank'>
      <div className='chosen-exerciese-bank-header'>
        <h4>Chosen Exercises:</h4>
        <p 
        onClick={() => writingCreateSetGroupData('currentStep', 'enter-info')}>
          Enter {currentSetGroup.set_group_type} Set Info <FaRegHandPointRight />
        </p>
        
      </div>
      <div className='bank-body'>
        {chosenExercises.length === 0 && 
          <p className='no-exercises-message'>Exercises you choose for your <strong><i>{currentSetGroup.set_group_type} Set</i></strong> will be displayed here...</p>
        }
        {chosenExercises.length > 0 &&
        <ul>
          {chosenExercises.map(exercise=> 
          <li key={`chosen-exercise-bank-${exercise._id}`}>
            {exercise.name}&nbsp;
            <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
              <FiMinusSquare className='remove-icon' onClick={() => removeChosenExercise(exercise._id)} />
            </OverlayTrigger>
          </li>)}
        </ul>}
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  removeChosenExercise,
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenExercisesBank)
