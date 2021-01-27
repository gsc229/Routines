import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Route, useRouteMatch} from 'react-router-dom'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import CurrentSets from '../../4_Components/execute_sets/CurrentSets'
import ExecuteSet from '../../4_Components/execute_sets/ExecuteSet'

export const ExecuteSetsPage = (props) => {

  const steps = ["choose-set-group", "execute-set"]

  const [currentStep, setCurrentStep] = useState(steps[0])

  return (
      <LayoutOne showTop={false}>
        <Container 
        className='page execute-sets-page'>
          {currentStep === 'choose-set-group' && <CurrentSets steps={steps}  setCurrentStep={setCurrentStep} />}
          {currentStep === 'execute-set' && <ExecuteSet steps={steps} setCurrentStep={setCurrentStep} />}
        </Container>
      </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSetsPage)
