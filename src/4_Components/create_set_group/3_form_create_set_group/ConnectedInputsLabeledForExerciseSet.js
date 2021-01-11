import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {writingExerciseSet} from '../../../1_Actions/exerciseSetActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'



const DynamicFieldInput = ({
  placeholder='optional',
  required=true,
  label,
  inputPirmitiveType='number',
  min=0,
  max=null,
  currentExerciseSet,
  writingExerciseSet,
  appendText,
  field // rep_max reps_per_set target_weight target_time target_distance total_sets
}) => {
  
  return(
    <Form.Group>
      <Form.Label>
         {label}
        </Form.Label>
      <InputGroup>
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !currentExerciseSet[field] ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => writingExerciseSet(e.target.name, e.target.value)} 
        value={currentExerciseSet[field]} 
        name={field} 
        type={inputPirmitiveType}
        max={max}
        min={min}/>
      {appendText && 
      <InputGroup.Append>
        <InputGroup.Text>{appendText}</InputGroup.Text>
      </InputGroup.Append>}
      </InputGroup>
    </Form.Group>
  )
}


DynamicFieldInput.propTypes = {
  field: PropTypes.oneOf([, 'reps_per_set', 'target_weight', 'target_time', 'target_distance', 'total_sets']).isRequired
}







const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  writingExerciseSet
}

export const ConnectedDynamicFieldInputForExerciseSet = connect(mapStateToProps, mapDispatchToProps)(DynamicFieldInput)
