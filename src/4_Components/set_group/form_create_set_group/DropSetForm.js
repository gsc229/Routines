import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  ConnectedRepMaxInput, 
  ConnectedRestSecondsInput, 
  ConnectedWeightInput, 
  ConnectedTotalSetsInput,
  ConnectedNextStepButton
} from './shared_btns_and_inputs/SetGroupBtnsAndInputs'
import Container  from 'react-bootstrap/Container'



export const DropSetForm = ({
  writingCreateSetGroupData,
  createSetGroupData
}) => {

  const handleChange = e => {
    writingCreateSetGroupData(e.target.name, e.target.value)
  }

  const {rep_max, weight, percent_decrease, total_sets} = createSetGroupData

  const [allowAddExercixe, setAllowedExercise] = useState(rep_max !== "" && percent_decrease !== "" && total_sets !=="" && weight !== "")

  useEffect(()=>{
    setAllowedExercise(rep_max !== "" && percent_decrease !== "" && total_sets !=="" && weight !== "")
  },[createSetGroupData])


  return (
   <Container className='drop-set-form'>
     <Row>

       <Col sm='12' className='input-column'><h6>Step 1: Details</h6></Col>

       <Col sm='12' className='input-column'>
        <Link to='#'>Rep Max Calculator</Link>
        
       </Col>

       <Col className='input-column' lg='4' sm='12'>
         <ConnectedRepMaxInput />
       </Col>

       <Col className='input-column' lg='3' sm='12'>
        <ConnectedWeightInput />
       </Col>

       <Col className='input-column' lg='4' sm='12'>
         <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Drop</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control 
          onChange={handleChange} 
          value={percent_decrease} 
          name='percent_decrease' 
          max={99}
          min={1} type='number' />
          <InputGroup.Append>
            <InputGroup.Text>% each set</InputGroup.Text>
          </InputGroup.Append>
         </InputGroup>
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedTotalSetsInput />
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedRestSecondsInput />
       </Col>

       <Col className='input-column'  sm='12'>
        <ConnectedNextStepButton
         disabled={!allowAddExercixe}
         text={'Proceed to add exercise'}
         writeDataKey='currentStep'
         writeDataValue='choose-exercise'
         />
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
