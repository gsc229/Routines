import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'

export const CreateOrEditWeek = (props) => {
  return (
    <Layout>
      <Container>
        <h1>Create or Edit Week Page</h1>
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditWeek)

