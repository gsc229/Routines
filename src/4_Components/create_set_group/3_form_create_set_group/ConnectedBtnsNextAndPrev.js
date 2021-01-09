
import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'
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

export const ConnectedPreviousStepButton = connect(mapStateToProps, mapDispatchToProps)(PreviousStepButton)
export const ConnectedNextStepButton = connect(mapStateToProps, mapDispatchToProps)(NextStepButton)