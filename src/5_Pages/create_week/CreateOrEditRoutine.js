import React, {useState} from 'react'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineInfoForm from '../../4_Components/create_routine/RoutineInfoForm'
import CreateOrEditWeek from '../../4_Components/create_week/CreateOrEditWeek'

const CreateOrEditRoutine = () => {

  const [step, setStep] = useState("initiate")
  console.log({step})
  return (
    <Layout>
      <Container>
        {step === "initiate" && <RoutineInfoForm setStep={setStep} />}
        {step === "create-week" && <CreateOrEditWeek setStep={setStep} />}
      </Container>
    </Layout>
  )
}

export default CreateOrEditRoutine
