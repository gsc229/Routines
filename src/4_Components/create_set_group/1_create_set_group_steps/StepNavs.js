import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {canMoveToForm, canMoveToPreview} from '../createSetGroupHelpers'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {ConnectedNextStepButton} from '../3_form_create_set_group/ConnectedBtnsNextAndPrevStep'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CreateSetGroupBtn from '../3_form_create_set_group/CreateSetGroupBtn'
import { localWritingSetGroup } from '../../../1_Actions/setGroupActions'

export const StepNavs = ({
  currentStep,
  currentExerciseSets,
  currentSetGroup,
  createSetGroupData,
  showNextBtn=true,
  showPrevBtn=true,
  localWritingCreateSetGroupData
}) => {
  const {set_group_type} = currentSetGroup
  const { mode } = createSetGroupData
  // choose-type --> choose-exercises --> enter-info --> preview-set-group

  useEffect(() => {
    if(mode !== 'editing' && currentSetGroup._id){
      localWritingCreateSetGroupData('mode', 'editing')
    }
  }, [])

  const nextStep = {
    "choose-exercise": {
      step: "enter-info",
      text: `${set_group_type} Set Targets`,
      allowFunction: canMoveToForm
    },
    "enter-info": {
      step: "preview-set-group",
      text: `Preview ${set_group_type} Set`,
      allowFunction: canMoveToPreview
    }
  }

  const prevStep = {
    "preview-set-group": {
      step: "enter-info",
      text: `Back to ${set_group_type} Set Info`
    },
    "enter-info": {
      step: "choose-exercise",
      text: "Back To Choose Exercise"
    },
    "choose-exercise": {
      step: "choose-type",
      text: "Back Set Group Type"
    },
    "choose-type": {
      step: "choose-type",
      text: ""
    }
  }


  return (
    <Container className='create-set-group-navs-container'>

      <Row className='create-set-group-navs-row'>

        {/* {showPrevBtn && 
        <Col className='create-set-group-btn-column' sm='12' md='4'>
          {currentStep !== 'choose-type' && 
          <ConnectedPreviousStepButton
          writeDataKey='currentStep'
          writeDataValue={prevStep[currentStep].step}
          text={prevStep[currentStep].text}
          />}
        </Col>} */}
        
        {currentStep === 'choose-exercise' && !currentSetGroup._id &&
        <Col className='create-set-group-btn-column' sm='12' md='4'>
          <CreateSetGroupBtn />
        </Col>}

        {currentStep !== 'preview-set-group' && currentStep !== 'choose-type' && currentStep !== 'choose-exercise' && showNextBtn &&
        <Col className='create-set-group-btn-column' sm='12' md='4'>
          <ConnectedNextStepButton
          disabled={
          !nextStep[currentStep].allowFunction(set_group_type, createSetGroupData, currentExerciseSets)}
          variant='success'
          writeDataKey='currentStep'
          writeDataValue={nextStep[currentStep].step}
          text={nextStep[currentStep].text}
          />
        </Col>}

      </Row>

    </Container>
  )
}

const mapStateToProps = (state) => ({
  currentStep: state.setGroupReducer.createSetGroupData.currentStep,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
  localWritingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(StepNavs)
