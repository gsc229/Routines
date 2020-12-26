import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'


export const ViewRoutinePage = ({currentRoutine}) => {

  return (
    <Layout>
      <Container className='view-routine-container'>
        <h5>Managing Routine: {currentRoutine.name || 'id' + currentRoutine._id}</h5>
        <div style={{height: '150px', border: '1px solid green'}} className="set-group-bank">
          <h6>Set Groups Go Here</h6>
          <button className="btn btn-success">Create Set Group</button>
        </div>
        <div style={{height: '300px', border: '1px solid green'}} className="weeks-container">
          <h6>Weeks go here</h6>
        </div>
        {JSON.stringify(currentRoutine,'', 2)}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoutinePage)
