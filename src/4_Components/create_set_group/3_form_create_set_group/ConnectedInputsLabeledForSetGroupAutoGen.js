import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const RepMaxInput = ({
  placeholder,
  required,
  createSetGroupData,
  localWritingCreateSetGroupData
}) => {
  const {rep_max} = createSetGroupData

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Base on</InputGroup.Text>
      </InputGroup.Prepend>
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !rep_max ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e)=> localWritingCreateSetGroupData(e.target.name, e.target.value)} 
        value={rep_max} 
        name='rep_max' 
        type='number'
        min={1}/>
      <InputGroup.Append>
        <InputGroup.Text>Rep Max</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  )
}

const DynamicFieldInput = ({
  placeholder,
  required=true,
  label,
  inputPirmitiveType='number',
  min=0,
  max=null,
  createSetGroupData,
  localWritingCreateSetGroupData,
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
        onChange={(e) => localWritingCreateSetGroupData(e.target.name, e.target.value)} 
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


DynamicFieldInput.propTypes = {
  field: PropTypes.oneOf(['rep_max ', 'reps_per_set', 'starting_weight', 'starting_time', 'starting_distance', 'total_sets']).isRequired
}

const WeightInput = ({
  placeholder,
  required,
  createSetGroupData,
  localWritingCreateSetGroupData
}) => {
  const {starting_weight} = createSetGroupData

  return (
    <Form.Group>
      <Form.Label>
          Weight
        </Form.Label>
      <InputGroup>
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !starting_weight ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => localWritingCreateSetGroupData(e.target.name, e.target.value)} 
        value={starting_weight} 
        name='starting_weight' 
        type='number'
        min={1}/>
      <InputGroup.Append>
        <InputGroup.Text>lbs/kgs</InputGroup.Text>
      </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  )
}

const RepsPerSetInput = ({
  placeholder,
  required,
  createSetGroupData,
  localWritingCreateSetGroupData
}) => {
  const {reps_per_set} = createSetGroupData

  return (
    <Form.Group>
      
        <Form.Label>
          Reps/set
        </Form.Label>
      
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !reps_per_set ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => localWritingCreateSetGroupData(e.target.name, e.target.value)} 
        value={reps_per_set} 
        name= 'reps_per_set' 
        type='number'
        min={0}/>
    </Form.Group>
  )
}

const TotalSetsInput = ({
  placeholder,
  required,
  createSetGroupData,
  localWritingCreateSetGroupData
}) => {
  const {total_sets} = createSetGroupData

  return (
    <Form.Group>
      
        <Form.Label>Total Sets</Form.Label>
      
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !total_sets ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => localWritingCreateSetGroupData(e.target.name, e.target.value)} 
        value={total_sets} name='total_sets' 
        max={20} 
        min={1} type='number' />
    </Form.Group>
)
}

const RestSecondsInput = ({
  placeholder,
  required,
  createSetGroupData,
  localWritingCreateSetGroupData
}) => {
  const {rest_time} = createSetGroupData

  return (
    <Form.Group>
     
        <Form.Label>Rest Seconds</Form.Label>
      
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !rest_time ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => localWritingCreateSetGroupData(e.target.name, e.target.value)}  
        value={rest_time} 
        name='rest_time' 
        min={0} 
        type='number' />
    </Form.Group>
  )
}



const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  localWritingCreateSetGroupData
}

export const ConnectedRepMaxInput = connect(mapStateToProps, mapDispatchToProps)(RepMaxInput)
export const ConnectedTotalSetsInput = connect(mapStateToProps, mapDispatchToProps)(TotalSetsInput)
export const ConnectedWeightInput = connect(mapStateToProps, mapDispatchToProps)(WeightInput)
export const ConnectedRestSecondsInput = connect(mapStateToProps, mapDispatchToProps)(RestSecondsInput)
export const ConnectedRepsPerSetInput = connect(mapStateToProps, mapDispatchToProps)(RepsPerSetInput)
export const ConnectedDynamicFieldInput = connect(mapStateToProps, mapDispatchToProps)(DynamicFieldInput)
