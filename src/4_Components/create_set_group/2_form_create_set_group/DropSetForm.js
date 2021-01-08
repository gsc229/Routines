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
} from './ConnectedLabelInputs'
import ConnectedDecrementLabeled from './ConnectedDecrementLabeled'
import Container  from 'react-bootstrap/Container'



export const DropSetForm = () => {

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
         <ConnectedDecrementLabeled />
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
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DropSetForm)
