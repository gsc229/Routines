import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import './user_dashboard.scss'

export const UserDashBoard = ({user}) => {

  

  return (
    <LayoutOne showTop={false}>
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
        {JSON.stringify(user)}
      </div>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashBoard)
