import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import DropDown from 'react-bootstrap/Dropdown'
import DropDownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { 
  ConnectedRestSecondsInput,
  ConnectedRepsPerSetInput,
  ConnectedWeightInput, 
  ConnectedTotalSetsInput,
  ConnectedNextStepButton
} from './SetGroupBtnsAndInputs'
import Container  from 'react-bootstrap/Container'



export const DropSetForm = ({
  writingCreateSetGroupData,
  createSetGroupData
}) => {

  const {rep_max, starting_weight, percent_weight_decrease, weight_decrease, total_sets} = createSetGroupData



  const allowAddExercise = total_sets !=="" && starting_weight !== ""
  const [decreaseMethod, setDecreaseMethod] = useState({key: 'percent_weight_decrease', value: 10})

  useEffect(() => {
    writingCreateSetGroupData('percent_weight_decrease', 10)
  }, [])


  useEffect(()=>{
    console.log('DROPSET FORM')
    if(!percent_weight_decrease && !weight_decrease){
      writingCreateSetGroupData('percent_weight_decrease', 10)
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
   <Container className='info-form drop-set-form'>
     <Row>

       <Col sm='12' className='input-column'><h6>Step 1: Details</h6></Col>

       <Col sm='12' className='input-column'>
        <Link to='#'>Rep Max Calculator</Link>
       </Col>

       <Col className='input-column' lg='3' sm='12'>
        <ConnectedWeightInput required={true}  placeholder='required' />
       </Col>

       <Col className='input-column' lg='4' sm='12'>
         <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Drop</InputGroup.Text>
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
            title={decreaseMethod.key === 'percent_weight_decrease' ? "lbs/kgs" : "%"}>
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
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedTotalSetsInput required={true}  placeholder='required' />
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedRepsPerSetInput placeholder='optional' />
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedRestSecondsInput placeholder='optional' />
       </Col>
     </Row>

    
   </Container>
  )
}

const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(DropSetForm)
