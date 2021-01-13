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
  inputSize,
  labelText,
  showLabel=true,
  decrementField, // weight || reps || time || distance || rest_time
}) => {

  const fieldCapitalized = 
  decrementField
  .split("_")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")

  if(!createSetGroupData[`starting_${decrementField}`]){
    createSetGroupData[`starting_${decrementField}`] = 0
  }

  if(!labelText) labelText = `Decrease ${fieldCapitalized}`
  const allowPercent = !(decrementField === "reps" || decrementField === "rest_time ")
  const {total_sets} = createSetGroupData
  const maxDec = Math.floor(JSON.parse(createSetGroupData[`starting_${decrementField}`]) / JSON.parse(total_sets))
  const defaultDecValue = Math.floor(maxDec/10)

  const [decreaseMethod, setDecreaseMethod] = useState({key: `${decrementField}_decrease`, value: defaultDecValue})


  const handleDecrement = (e) => {
    if(!decreaseMethod.key.includes('percent')){
      const decValue = JSON.parse(e.target.value)
      const number = decValue <  maxDec ? decValue : maxDec
      setDecreaseMethod({...decreaseMethod, value: number})
    }else{
      setDecreaseMethod({...decreaseMethod, value: e.target.value})
    }
  }
  
  /* useEffect(() => {
    writingCreateSetGroupData(`${decrementField}_decrease`, 10)
  }, []) */

  useEffect(()=>{
    if(!createSetGroupData[`percent_${decrementField}_decrease`] && !createSetGroupData[`${decrementField}_decrease`]){
      writingCreateSetGroupData(`${decrementField}_decrease`, Math.floor(maxDec/10))
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
        {labelText} {!decreaseMethod.key.includes('percent') && <span>Max: {maxDec}</span>}
      </Form.Label>

      <InputGroup size={inputSize}>

        <Form.Control
        onChange={handleDecrement}
        value={decreaseMethod.value} 
        placeholder={`decrease ${decrementField}`}
        name={decreaseMethod.key} 
        max={99}
        min={0} 
        type='number'
        size={inputSize}
        />

        
        {allowPercent && 
        <DropDownButton
          as={InputGroup.Append}
          title={decreaseMethod.key === `percent_${decrementField}_decrease` ? "%" : "lbs/kgs"}>
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
