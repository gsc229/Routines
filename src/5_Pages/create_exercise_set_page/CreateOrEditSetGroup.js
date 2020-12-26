import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Layout from '../../6_Layouts/layout_one/LayoutOne'

export const CreateOrEditExerciseSet = (props) => {
  return (
    <Layout>
      <Container>
        <h1>Create Or Edit Exercise Set</h1>
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExerciseSet)
