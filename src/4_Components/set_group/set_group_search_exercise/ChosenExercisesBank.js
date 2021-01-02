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
  removeChosenExercise,
  writingCreateSetGroupData
}) => {
  return (
    <Container 
    className='chosen-exercises-bank'>
      <div className='chosen-exerciese-bank-header'>
        <h4>Chosen Exercises:</h4>
        <p 
        onClick={() => writingCreateSetGroupData('currentStep', 'preview-set-group')}>Preview Set Group <FaRegHandPointRight /></p>
        
      </div>
      <ul>
        {chosenExercises.map(exercise=> 
        <li key={`chosen-exercise-bank-${exercise._id}`}>
          {exercise.name}&nbsp;
          <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
            <FiMinusSquare className='remove-icon' onClick={() => removeChosenExercise(exercise._id)} />
          </OverlayTrigger>
        </li>)}
      </ul>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises
})

const mapDispatchToProps = {
  removeChosenExercise,
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ChosenExercisesBank)
