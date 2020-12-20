import React, {useState} from 'react'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import CreateRoutineCompleteForm from '../../4_Components/create_routine/CreateRoutineCompleteForm'


const CreateRoutine = () => {

  const [step, setStep] = useState("initiate")

  return (
    <Layout>
      <Container>
        {step === "initiate" && <CreateRoutineCompleteForm setStep={setStep} />}
      </Container>
    </Layout>
  )
}

export default CreateRoutine
