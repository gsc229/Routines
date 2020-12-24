import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import ExerciseForm from '../../4_Components/form_exercise/ExerciseForm'

export const CreateOrEditExercisePage = (props) => {
  return (
    <Layout>
      <Container>
        <ExerciseForm/>
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExercisePage)
