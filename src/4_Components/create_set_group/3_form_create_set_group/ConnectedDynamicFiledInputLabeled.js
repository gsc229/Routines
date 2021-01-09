import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const ConnectedDynamicFieldInput = ({
  placeholder,
  required=true,
  label,
  inputPirmitiveType='number',
  min=0,
  max=null,
  createSetGroupData,
  writingCreateSetGroupData,
  appendText,
  field // rep_max reps_per_set starting_weight starting_time starting_distance total_sets
}) => {
  
  return(
    <Form.Group>
      <Form.Label>
         {label}
        </Form.Label>
      <InputGroup>
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !createSetGroupData[field] ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)} 
        value={createSetGroupData[field]} 
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


ConnectedDynamicFieldInput.propTypes = {
  field: PropTypes.oneOf(['rep_max ', 'reps_per_set', 'starting_weight', 'starting_time', 'starting_distance', 'total_sets']).isRequired
}

const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDynamicFieldInput)