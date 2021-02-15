import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {localWritingExerciseSet} from '../../../1_Actions/exerciseSetActions'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'


const DynamicFieldInput = ({
  placeholder='optional',
  required=true,
  label,
  inputType="number",
  min=0,
  max=2000,
  currentExerciseSet,
  localWritingExerciseSet,
  appendText,
  field // rep_max reps_per_set target_weight target_time target_distance total_sets
}) => {

  /* onChange={(e) => localWritingExerciseSet(e.target.name, inputType === 'number' ? JSON.parse(e.target.value) : e.target.value)}  */
  const handleChange = (e) => {
    const number = e.target.value <= max ? JSON.parse(e.target.value) : 2000
    localWritingExerciseSet(e.target.name, number)
  }
  
  return(
    <Form>
      <Form.Group>
        <Form.Label>
           {label}
        </Form.Label>
        <InputGroup>
          <FormControl
          placeholder={placeholder}
          className={`${required ? !currentExerciseSet[field] ? 'requirement-not-met' : 'requirment-met' : ""}`} 
          onChange={handleChange} 
          value={currentExerciseSet[field] || 0 } 
          name={field} 
          type={inputType}
          max={max}
          min={min}
          />
        {appendText && 
        <InputGroup.Append>
          <InputGroup.Text>{appendText}</InputGroup.Text>
        </InputGroup.Append>}
        </InputGroup>
      </Form.Group>
    </Form>
  )
}


DynamicFieldInput.propTypes = {
  field: PropTypes.oneOf(['reps_per_set', 'target_weight', 'target_time', 'target_reps', 'target_distance', 'total_sets']).isRequired
}







const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet
})

const mapDispatchToProps = {
  localWritingExerciseSet
}

const ConnectedDynamicFieldInputForExerciseSet = connect(mapStateToProps, mapDispatchToProps)(DynamicFieldInput)

export default ConnectedDynamicFieldInputForExerciseSet
