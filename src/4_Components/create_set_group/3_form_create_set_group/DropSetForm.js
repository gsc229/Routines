import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { 
  ConnectedRestSecondsInput,
  ConnectedRepsPerSetInput,
  ConnectedWeightInput, 
  ConnectedTotalSetsInput
} from './ConnectedInputsLabeledForSetGroupAutoGen'
import StepNavs from '../1_create_set_group_steps/StepNavs'
import ConnectedDecrementLabeled from './ConnectedDecrementLabeled'
import ConnectedDecrementPrepend from './ConnectedDecrementPrepend'
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
         <ConnectedDecrementLabeled decrementField='weight'/>
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
     <StepNavs showPrevBtn={false} />
   </Container>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DropSetForm)
