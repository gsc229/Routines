import React from 'react'
import { connect } from 'react-redux'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'

export const ExecuteSetsPage = (props) => {
  return (
      <LayoutOne showTop={false}>
        <Container 
        className='page execute-sets-page'>
          <h2>Eexecute Sets</h2>
        </Container>
      </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSetsPage)
