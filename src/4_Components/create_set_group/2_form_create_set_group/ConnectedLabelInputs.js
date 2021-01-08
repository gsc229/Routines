
import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import DropDown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import {FaHandPointRight, FaHandPointLeft} from 'react-icons/fa'

const RepMaxInput = ({
  placeholder,
  required,
  createSetGroupData,
  writingCreateSetGroupData
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
        onChange={(e)=> writingCreateSetGroupData(e.target.name, e.target.value)} 
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

const WeightInput = ({
  placeholder,
  required,
  createSetGroupData,
  writingCreateSetGroupData
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
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)} 
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
  writingCreateSetGroupData
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
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)} 
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
  writingCreateSetGroupData
}) => {
  const {total_sets} = createSetGroupData

  return (
    <Form.Group>
      
        <Form.Label>Total Sets</Form.Label>
      
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !total_sets ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)} 
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
  writingCreateSetGroupData
}) => {
  const {rest_time} = createSetGroupData

  return (
    <Form.Group>
     
        <Form.Label>Rest Seconds</Form.Label>
      
        <Form.Control
        placeholder={placeholder}
        className={`${required ? !rest_time ? 'requirement-not-met' : 'requirment-met' : ""}`} 
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)}  
        value={rest_time} 
        name='rest_time' 
        min={0} 
        type='number' />
    </Form.Group>
  )
}

const NextStepButton = ({
  variant,
  disabled,
  text,
  writingCreateSetGroupData,
  writeDataKey,
  writeDataValue
}) => {

  return (
    <Button
      variant={variant}
      className={`step-btn next-step-btn ${disabled && 'disabled-next-step-btn'}`}
      onClick={() => writingCreateSetGroupData(writeDataKey, writeDataValue)} 
      disabled={disabled}>
        {text} &nbsp;
        <FaHandPointRight style={{color:'white'}} className='next-link' />
    </Button>
  )
}

const PreviousStepButton = ({
  variant,
  disabled,
  text,
  writingCreateSetGroupData,
  writeDataKey,
  writeDataValue
}) => {

  return (
    <Button
      variant={variant}
      className={`step-btn previous-step-btn ${disabled && 'disabled-previous-step-btn'}`}
      onClick={() => writingCreateSetGroupData(writeDataKey, writeDataValue)} 
      disabled={disabled}>
        <FaHandPointLeft style={{color:'white'}} className='previous-link' />
        &nbsp;   
        {text}
    </Button>
  )
}


const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export const ConnectedRepMaxInput = connect(mapStateToProps, mapDispatchToProps)(RepMaxInput)
export const ConnectedTotalSetsInput = connect(mapStateToProps, mapDispatchToProps)(TotalSetsInput)
export const ConnectedWeightInput = connect(mapStateToProps, mapDispatchToProps)(WeightInput)
export const ConnectedRestSecondsInput = connect(mapStateToProps, mapDispatchToProps)(RestSecondsInput)
export const ConnectedPreviousStepButton = connect(mapStateToProps, mapDispatchToProps)(PreviousStepButton)
export const ConnectedNextStepButton = connect(mapStateToProps, mapDispatchToProps)(NextStepButton)
export const ConnectedRepsPerSetInput = connect(mapStateToProps, mapDispatchToProps)(RepsPerSetInput)
