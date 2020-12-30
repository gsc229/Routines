
import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import {FiArrowRight, FiArrowLeft} from 'react-icons/fi'

const RepMaxInput = ({
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
  createSetGroupData,
  writingCreateSetGroupData
}) => {
  const {weight} = createSetGroupData

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>
          @
        </InputGroup.Text>
      </InputGroup.Prepend>
        <Form.Control 
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)} 
        value={weight} 
        name='weight' 
        type='number'
        min={1}/>
      <InputGroup.Append>
        <InputGroup.Text>lbs/kgs</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  )
}

const TotalSetsInput = ({
  createSetGroupData,
  writingCreateSetGroupData
}) => {
  const {total_sets} = createSetGroupData

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Total Sets</InputGroup.Text>
      </InputGroup.Prepend>
        <Form.Control 
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)} 
        value={total_sets} name='total_sets' 
        max={20} 
        min={1} type='number' />
    </InputGroup>
)
}

const RestSecondsInput = ({
  createSetGroupData,
  writingCreateSetGroupData
}) => {
  const {rest_time} = createSetGroupData

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Rest Seconds</InputGroup.Text>
      </InputGroup.Prepend>
        <Form.Control 
        onChange={(e) => writingCreateSetGroupData(e.target.name, e.target.value)}  
        value={rest_time} 
        name='rest_time' 
        min={0} 
        type='number' />
    </InputGroup>
  )
}

const NextStepButton = ({
  disabled,
  text,
  writingCreateSetGroupData,
  writeDataKey,
  writeDataValue
}) => {

  return (
    <Button
      className={`step-btn next-step-btn ${disabled && 'disabled-next-step-btn'}`}
      onClick={() => writingCreateSetGroupData(writeDataKey, writeDataValue)} 
      disabled={disabled}>
        {text} &nbsp;
        <FiArrowRight style={{color:'white'}} className='next-link' />
    </Button>
  )
}

const PreviousStepButton = ({
  disabled,
  text,
  writingCreateSetGroupData,
  writeDataKey,
  writeDataValue
}) => {

  return (
    <Button
      className={`step-btn previous-step-btn ${disabled && 'disabled-previous-step-btn'}`}
      onClick={() => writingCreateSetGroupData(writeDataKey, writeDataValue)} 
      disabled={disabled}>
        <FiArrowLeft style={{color:'white'}} className='previous-link' />
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