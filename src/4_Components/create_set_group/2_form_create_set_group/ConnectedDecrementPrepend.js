import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import DropDownButton from 'react-bootstrap/DropdownButton'
import DropDown from 'react-bootstrap/Dropdown'

export const ConnectedDecrementPrepend = ({
  writingCreateSetGroupData,
  createSetGroupData,
  prependText="Drop"
}) => {
  const {rep_max, starting_weight, percent_weight_decrease, weight_decrease, total_sets} = createSetGroupData
  const [decreaseMethod, setDecreaseMethod] = useState({key: 'percent_weight_decrease', value: 10})

  useEffect(() => {
    writingCreateSetGroupData('weight_decrease', 10)
  }, [])

  useEffect(()=>{
    if(!percent_weight_decrease && !weight_decrease){
      writingCreateSetGroupData('weight_decrease', 10)
    }
    if(decreaseMethod.key === 'percent_weight_decrease'){
      writingCreateSetGroupData(decreaseMethod.key, decreaseMethod.value)
      writingCreateSetGroupData('weight_decrease', 0)
    } else{
      writingCreateSetGroupData(decreaseMethod.key, decreaseMethod.value)
      writingCreateSetGroupData('percent_weight_decrease', 0) 
    }

  },[decreaseMethod])



  return (
    <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>{prependText}</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
          onChange={(e)=> setDecreaseMethod({...decreaseMethod, value: e.target.value})}
          defaultValue={10}
          value={decreaseMethod.value} 
          placeholder='10% default'
          name={decreaseMethod.key} 
          max={99}
          min={1} type='number' />
          <DropDownButton
            as={InputGroup.Append}
            title={decreaseMethod.key === 'percent_weight_decrease' ? "%" : "lbs/kgs"}>
            <DropDown.Item 
            onClick={() => setDecreaseMethod({...decreaseMethod, key: 'weight_decrease'})}>
              lbs/kgs
            </DropDown.Item>
            <DropDown.Item 
            onClick={() => setDecreaseMethod({...decreaseMethod, key: 'percent_weight_decrease'})}>
              %
            </DropDown.Item>
          </DropDownButton>
          <InputGroup.Append>
            <InputGroup.Text>each set</InputGroup.Text>
          </InputGroup.Append>
            
         </InputGroup>
  )
   
}

const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDecrementPrepend)
