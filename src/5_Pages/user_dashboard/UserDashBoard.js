import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import './user_dashboard.scss'

export const UserDashBoard = () => {

  

  return (
    <LayoutOne showTop={false}>
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
      </div>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashBoard)
