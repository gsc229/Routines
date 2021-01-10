
import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import {FaHandPointRight, FaHandPointLeft} from 'react-icons/fa'



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
        <FaHandPointRight className='next-link' />
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
        <FaHandPointLeft className='previous-link' />
        &nbsp;   
        {text}
    </Button>
  )
}

const NextStepBadge = ({
  pill=false,
  variant,
  disabled,
  text,
  writingCreateSetGroupData,
  writeDataKey,
  writeDataValue
}) => {

  return (
    <Badge
      pill={pill}
      variant={variant}
      className={`step-btn next-step-btn ${disabled && 'disabled-next-step-btn'}`}
      onClick={() => writingCreateSetGroupData(writeDataKey, writeDataValue)} 
      disabled={disabled}>
        {text} &nbsp;
        <FaHandPointRight className='next-link' />
    </Badge>
  )
}

const PreviousStepBadge = ({
  pill=false,
  variant,
  disabled,
  text,
  writingCreateSetGroupData,
  writeDataKey,
  writeDataValue
}) => {

  return (
    <Badge
      pill={pill}
      variant={variant}
      className={`step-btn previous-step-btn ${disabled && 'disabled-previous-step-btn'}`}
      onClick={() => writingCreateSetGroupData(writeDataKey, writeDataValue)} 
      disabled={disabled}>
        <FaHandPointLeft className='previous-link' />
        &nbsp;   
        {text}
    </Badge>
  )
}


const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export const ConnectedPreviousStepButton = connect(mapStateToProps, mapDispatchToProps)(PreviousStepButton)
export const ConnectedNextStepButton = connect(mapStateToProps, mapDispatchToProps)(NextStepButton)
export const ConnectedPreviousStepBadge = connect(mapStateToProps, mapDispatchToProps)(PreviousStepBadge)
export const ConnectedNextStepBadge = connect(mapStateToProps, mapDispatchToProps)(NextStepBadge)