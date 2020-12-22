import React from 'react'
import { connect } from 'react-redux'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'

export const UserDashBoard = ({user,userRoutines}) => {
  
  return (
    <LayoutOne showTop={false}>
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
        <div className='raw-data' >
          <pre style={{color: 'white'}}>{JSON.stringify(user, null, 2)}</pre>
          <pre style={{color: 'white'}}>{JSON.stringify(userRoutines, null, 2)}</pre>
        </div>
      </div>
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
