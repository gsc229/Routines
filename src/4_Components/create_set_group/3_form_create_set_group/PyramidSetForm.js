import React from 'react'
import { connect } from 'react-redux'
import ConnectedLabeledDynamicRow from './ConnectedRowDynamicFieldInputDecIncLabeldForGetGroupAutoGen'
import Container  from 'react-bootstrap/Container'

export const PyramidSetForm = () => {

  return (
   <Container className='info-form drop-set-form'>
     <ConnectedLabeledDynamicRow
      //fieldLabelText="Weight"
      lg='4'
      labelText='Weight'
      incrementField='weight'
      startingField='starting_weight'/>
    <ConnectedLabeledDynamicRow 
      lg='4'
      labelText='reps_per_set'
      startingField='reps_per_set'
      decrementField='reps_per_set'/>
     
     {/* <Row>

       <Col sm='12' className='input-column'><h6>Step 1: Details</h6></Col>

       <Col sm='12' className='input-column'>
        <Link to='#'>Rep Max Calculator</Link>
       </Col>

       <Col className='input-column' lg='3' sm='12'>
        <ConnectedWeightInput required={true}  placeholder='required' />
       </Col>

       <Col className='input-column' lg='4' sm='12'>
         <ConnectedIncrementLabeled incrementField='weight' labelText="Increase Weight" />
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
     </Row> */}

    
   </Container>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PyramidSetForm)