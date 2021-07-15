import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import DropDownButton from 'react-bootstrap/DropdownButton'
import DropDown from 'react-bootstrap/Dropdown'

export const ConnectedIncrementLabeled = ({
  localWritingCreateSetGroupData,
  createSetGroupData,
  inputSize,
  labelText,
  showLabel=true,
  incrementField, // weight || reps || time || distance || rest_time
}) => {

  
  const fieldCapitalized = 
  incrementField
  .split("_")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")

  if(!labelText) labelText = `Increase ${fieldCapitalized}`
  const allowPercent = !(incrementField === "reps" || incrementField === "rest_time ")

  const [increaseMethod, setIncreaseMethod] = useState({key: `${incrementField}_increase`, value: 0})
  
  useEffect(() => {
    localWritingCreateSetGroupData(`${incrementField}_increase`, 10)
  }, [localWritingCreateSetGroupData, incrementField])

  useEffect(()=>{
    /* if(!createSetGroupData[`percent_${incrementField}_increase`] && !createSetGroupData[`${incrementField}_increase`]){
      localWritingCreateSetGroupData(`${incrementField}_increase`, 10)
    } */
    if(increaseMethod.key === `percent_${incrementField}_increase`){
      localWritingCreateSetGroupData(increaseMethod.key, increaseMethod.value)
      localWritingCreateSetGroupData(`${incrementField}_increase`, 0)
    } else{
      localWritingCreateSetGroupData(increaseMethod.key, increaseMethod.value)
      localWritingCreateSetGroupData(`percent_${incrementField}_increase`, 0) 
    }

  },[increaseMethod, incrementField, localWritingCreateSetGroupData])

  return (
    <Form.Group>

      {showLabel && 
       <Form.Label>
        {labelText}
      </Form.Label>}

      <InputGroup size={inputSize}>

          <Form.Control
          onChange={(e)=> setIncreaseMethod({...increaseMethod, value: JSON.parse(e.target.value)})}
          value={increaseMethod.value} 
          placeholder='10% default'
          name={increaseMethod.key} 
          max={99}
          min={1} 
          type='number' 
          size={inputSize}/>

          {allowPercent && 
          <DropDownButton
            as={InputGroup.Append}
            title={increaseMethod.key === `percent_${incrementField}_increase` ? "%" : 'lbs/kgs'}>
            <DropDown.Item 
            onClick={() => setIncreaseMethod({...increaseMethod, key: `${incrementField}_increase`})}>
              lbs/kgs
            </DropDown.Item>
            <DropDown.Item 
            onClick={() => setIncreaseMethod({...increaseMethod, key: `percent_${incrementField}_increase`})}>
              %
            </DropDown.Item>
          </DropDownButton>}

          <InputGroup.Append>
            <InputGroup.Text>each set</InputGroup.Text>
          </InputGroup.Append>

      </InputGroup>

    </Form.Group>
  )
}

ConnectedIncrementLabeled.propTypes = {
  incrementField: PropTypes.oneOf(["weight", "reps", "time", "distance", "rest_time"]).isRequired
}

const mapStateToProps = (state) => ({  
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  localWritingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedIncrementLabeled)