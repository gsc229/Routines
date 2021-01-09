import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import DropDownButton from 'react-bootstrap/DropdownButton'
import DropDown from 'react-bootstrap/Dropdown'

export const ConnectedDecrementLabeled = ({
  writingCreateSetGroupData,
  createSetGroupData,
  labelText,
  decrementField, // weight || reps || time || distance || rest_time
}) => {
  const fieldCapitalized = decrementField.charAt(0).toUpperCase() + decrementField.slice(1)
  if(!labelText) labelText = `Drop ${fieldCapitalized}`
  const allowPercent = !(decrementField === "reps" || decrementField === "rest_time ")
  //const {rep_max, starting_weight, percent_weight_decrease, weight_decrease, total_sets} = createSetGroupData
  const [decreaseMethod, setDecreaseMethod] = useState({key: `${decrementField}_decrease`, value: 10})
  
  useEffect(() => {
    writingCreateSetGroupData(`${decrementField}_decrease`, 10)
  }, [])

  useEffect(()=>{
    if(!createSetGroupData[`percent_${decrementField}_decrease`] && !createSetGroupData[`${decrementField}_decrease`]){
      writingCreateSetGroupData(`${decrementField}_decrease`, 10)
    }
    if(decreaseMethod.key === `percent_${decrementField}_decrease`){
      writingCreateSetGroupData(decreaseMethod.key, decreaseMethod.value)
      writingCreateSetGroupData(`${decrementField}_decrease`, 0)
    } else{
      writingCreateSetGroupData(decreaseMethod.key, decreaseMethod.value)
      writingCreateSetGroupData(`percent_${decrementField}_decrease`, 0) 
    }

  },[decreaseMethod])

  return (
    <Form.Group>
      <Form.Label>
        {labelText}
      </Form.Label>
      <InputGroup>
          <Form.Control
          onChange={(e)=> setDecreaseMethod({...decreaseMethod, value: e.target.value})}
          defaultValue={10}
          value={decreaseMethod.value} 
          placeholder={`decrease ${decrementField}`}
          name={decreaseMethod.key} 
          max={99}
          min={0} type='number' />
          {allowPercent && 
          <DropDownButton
            as={InputGroup.Append}
            title={decreaseMethod.key === `percent_${decrementField}_decrease` ? "%" : "lbs/kg"}>
            <DropDown.Item 
            onClick={() => setDecreaseMethod({...decreaseMethod, key: `${decrementField}_decrease`})}>
              lbs/kgs
            </DropDown.Item>
            <DropDown.Item 
            onClick={() => setDecreaseMethod({...decreaseMethod, key: `percent_${decrementField}_decrease`})}>
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



ConnectedDecrementLabeled.propTypes = {
  decrementField: PropTypes.oneOf(["weight", "reps", "time", "distance", "rest_time"]).isRequired
}

const mapStateToProps = (state) => ({  
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDecrementLabeled)
