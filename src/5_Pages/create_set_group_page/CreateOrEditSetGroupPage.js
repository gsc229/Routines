import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import SetGroupForm from '../../4_Components/form_set_group/SetGroupForm'

export const CreateOrEditExerciseSet = (props) => {
  return (
    <Layout>
      <Container>
        <h1>Create Or Edit Set Group Page</h1>
        <ul>
          TO DO:
          <li>Deterine if the Set Group already has a set group id...if not</li>
          <li>Initiate Set Group in State with routine, week, user ids and week_number and day_number</li>
          <li>Create Actions for Creating Set Group AFTER first excercise is chosen</li>
          <li>Retrun to ManageCurrentRoutinePage</li>
        </ul>
        <SetGroupForm />
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExerciseSet)
