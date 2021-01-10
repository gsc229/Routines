import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { 
  ConnectedRestSecondsInput,
  ConnectedRepsPerSetInput,
  ConnectedWeightInput, 
  ConnectedTotalSetsInput
} from './ConnectedInputsLabeled'
import {ConnectedNextStepButton} from './ConnectedBtnsNextAndPrevStep'
import Container  from 'react-bootstrap/Container'



export const StraightSetForm = ({
  writingCreateSetGroupData,
  createSetGroupData
}) => {

  let {starting_weight, percent_weight_decrease, weight_decrease, total_sets, reps_per_set, rest_time} = createSetGroupData

  
  const allowAddExercise = total_sets !=="" && starting_weight !== "" && reps_per_set !== "" && rest_time !== ""
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

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedTotalSetsInput required={true}  placeholder='required' />
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedRepsPerSetInput required={true} placeholder='required' />
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <ConnectedRestSecondsInput required={true} placeholder='required' />
       </Col>

       <Col className='input-column'  sm='12'>
        <ConnectedNextStepButton
         variant='success'
         disabled={!allowAddExercise}
         text='Proceed to Preview'
         writeDataKey='currentStep'
         writeDataValue='preview-set-group'
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

export default connect(mapStateToProps, mapDispatchToProps)(StraightSetForm)
