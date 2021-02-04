import React from 'react'
import { connect } from 'react-redux'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import Dashboard from '../../4_Components/dashboard/Dashboard'

export const UserDashBoard = ({user,userRoutines}) => {
  
  return (
    <LayoutOne showTop={false}>
      <Container 
      className='page dashboard-page'>
        <h1>User Dashboard</h1>
        <Dashboard />
        {/* <div className='raw-data' >
          <pre style={{color: 'white'}}>{JSON.stringify(user, null, 2)}</pre>
          <pre style={{color: 'white'}}>{JSON.stringify(userRoutines, null, 2)}</pre>
        </div> */}
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashBoard)
