import React from 'react'
import { connect } from 'react-redux'
import {canMoveToForm} from '../createSetGroupHelpers'
import {ConnectedNextStepButton, ConnectedPreviousStepButton} from '../set_group_btns_and_inputs/SetGroupBtnsAndInputs'
import Container from 'react-bootstrap/Container'
import CreateSetGroupBtn from '../set_group_btns_and_inputs/CreateSetGroupBtn'

export const StepNavs = ({
  currentStep,
  chosenExercises,
  currentSetGroup,
  canMoveToForm
}) => {


  const {set_group_type, name} = currentSetGroup

  // choose-type --> choose-exercises --> enter-info --> preview-set-group



  return (
    <Container>
      <Row className='create-set-group-navs'>
          <Col className='create-set-group-btn-column' sm='12' md='6'>
            <ConnectedPreviousStepButton
            writeDataKey='currentStep'
            writeDataValue='enter-info' 
            text='Back to Info Input'
            />
          </Col>
          
          {currentStep === 'preview-set-group' &&
          <Col className='create-set-group-btn-column' sm='12' md='6'>
            <CreateSetGroupBtn />
          </Col>}

          {currentStep !== 'preview-set-group' && canMoveToForm(set_group_type, chosenExercises) && 
          <Col className='create-set-group-btn-column' sm='12' md='6'>
            <ConnectedNextStepButton />
          </Col>}

      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  currentStep: state.setGroupReducer.createSetGroupData.currentStep,
  chosenExercises: state.setGroupReducer.chosenExercises,
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  canMoveToForm
}

export default connect(mapStateToProps, mapDispatchToProps)(StepNavs)
