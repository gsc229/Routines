import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import DropDownButton from 'react-bootstrap/DropdownButton'
import DropDown from 'react-bootstrap/Dropdown'

export const ConnectedIncrementLabeled = ({
  writingCreateSetGroupData,
  createSetGroupData,
  labelText,
  incrementField, // weight || reps || time || distance || rest_time
}) => {

  
  const fieldCapitalized = 
  incrementField
  .split("_")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
  if(!labelText) labelText = `Increase ${fieldCapitalized}`
  const allowPercent = !(incrementField === "reps" || incrementField === "rest_time ")

  const [increaseMethod, setIncreaseMethod] = useState({key: `${incrementField}_increase`, value: 10})
  
  useEffect(() => {
    writingCreateSetGroupData(`${incrementField}_increase`, 10)
  }, [])

  useEffect(()=>{
    if(!createSetGroupData[`percent_${incrementField}_increase`] && !createSetGroupData[`${incrementField}_increase`]){
      writingCreateSetGroupData(`${incrementField}_increase`, 10)
    }
    if(increaseMethod.key === `percent_${incrementField}_increase`){
      writingCreateSetGroupData(increaseMethod.key, increaseMethod.value)
      writingCreateSetGroupData(`${incrementField}_increase`, 0)
    } else{
      writingCreateSetGroupData(increaseMethod.key, increaseMethod.value)
      writingCreateSetGroupData(`percent_${incrementField}_increase`, 0) 
    }

  },[increaseMethod])

  return (
    <Form.Group>
      <Form.Label>
        {labelText}
      </Form.Label>
      <InputGroup>
          <Form.Control
          onChange={(e)=> setIncreaseMethod({...increaseMethod, value: e.target.value})}
          defaultValue={10}
          value={increaseMethod.value} 
          placeholder='10% default'
          name={increaseMethod.key} 
          max={99}
          min={1} 
          type='number' />
          {allowPercent && 
          <DropDownButton
            as={InputGroup.Append}
            title={increaseMethod.key === `percent_${incrementField}_increase` ? "%" : 'unit'}>
            <DropDown.Item 
            onClick={() => setIncreaseMethod({...increaseMethod, key: `${incrementField}_increase`})}>
              unit
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
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedIncrementLabeled)