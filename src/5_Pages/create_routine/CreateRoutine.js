import React, {useState} from 'react'
import {connect} from 'react-redux'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineInfoForm from '../../4_Components/create_routine/RoutineInfoForm'

const CreateRoutine = ({currentIsSaved}) => {

  // TO DO: if current is saved redirect to editing url

  return (
    <Layout>
      <Container>
         <RoutineInfoForm />
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  currentIsSaved: state.routineReducer.currentIsSaved,  
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoutine)
