import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const ConnectedDynamicFieldInput = ({
  placeholder,
  required=true,
  labelText,
  inputPirmitiveType='number',
  min=0,
  max=null,
  createSetGroupData,
  writingCreateSetGroupData,
  appendText,
  startingField // rep_max reps_per_set starting_weight starting_time starting_distance total_sets
}) => {
  
  const startingFieldCapitalized = 
  startingField
  .split("_")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
  if(!labelText) labelText = startingFieldCapitalized

  return(
    <Form.Group>
      <Form.Label>
         {labelText}
        </Form.Label>
      <InputGroup>
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !createSetGroupData[startingField] ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)} 
        value={createSetGroupData[startingField]} 
        name={startingField} 
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
  startingField: PropTypes.oneOf(['rep_max ', 'reps_per_set', 'starting_weight', 'starting_time', 'starting_distance', 'total_sets']).isRequired
}

const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDynamicFieldInput)