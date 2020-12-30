import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {createSetGroupWithSets} from '../../../3_APIs/setGroupApi'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {FiArrowRight} from 'react-icons/fi'

export const DropSetForm = ({
  writingCreateSetGroupData,
  createSetGroupData,
  currentSetGroup
}) => {

  const handleChange = e => {
    writingCreateSetGroupData(e.target.name, e.target.value)
  }

  const {rep_max, weight, percent_decrease, total_sets, rest_time} = createSetGroupData

  const [allowAddExercixe, setAllowedExercise] = useState(rep_max !== "" && percent_decrease !== "" && total_sets !=="")

  useEffect(()=>{
    setAllowedExercise(rep_max !== "" && percent_decrease !== "" && total_sets !=="")
  },[createSetGroupData])


  return (
   <Form className='drop-set-form'>
     <Row>

       <Col sm='12' className='input-column'><h6>Step 1: Details</h6></Col>

       <Col sm='12' className='input-column'>
        <Link>Rep Max Calculator</Link>
       </Col>

       <Col className='input-column' lg='4' sm='12'>
         <InputGroup>
         <InputGroup.Prepend>
            <InputGroup.Text>Base on</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control onChange={handleChange} value={rep_max} name='rep_max' type='number' min={1}/>
          <InputGroup.Append>
            <InputGroup.Text>Rep Max</InputGroup.Text>
          </InputGroup.Append>
         </InputGroup>
       </Col>

       <Col className='input-column' lg='3' sm='12'>
        <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            @
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control onChange={handleChange} value={weight} name='weight' type='number' min={1}/>
          <InputGroup.Append>
            <InputGroup.Text>lbs/kgs</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
       </Col>

       <Col className='input-column' lg='4' sm='12'>
         <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Drop</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control onChange={handleChange} value={percent_decrease} name='percent_decrease' min={1} type='number' />
          <InputGroup.Append>
            <InputGroup.Text>% each set</InputGroup.Text>
          </InputGroup.Append>
         </InputGroup>
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Total Sets</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control onChange={handleChange} value={total_sets} name='total_sets' max={20} min={1} type='number' />
         </InputGroup>
       </Col>

       <Col className='input-column' lg='3' sm='12'>
         <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Rest Seconds</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control onChange={handleChange} value={rest_time} name='rest_time' min={0} type='number' />
         </InputGroup>
       </Col>

       <Col className='input-column'  sm='12'>
        <Button
        className={`add-exercise-btn ${!allowAddExercixe && 'disabled-allow-exercise-btn'}`}
        onClick={() => writingCreateSetGroupData('currentStep', 'choose-exercise')} 
        disabled={!allowAddExercixe}>Proceed to add exercise &nbsp;
        <FiArrowRight style={{color:'white'}} className='next-link' /></Button>
       </Col>
     </Row>

    
   </Form>
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
