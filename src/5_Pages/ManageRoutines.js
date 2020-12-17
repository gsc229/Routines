import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutOne from '../6_Layouts/layout_one/LayoutOne'

export const ManageRoutines = () => {
  return (
    <LayoutOne showTop={false}>
      <div className='manage routines'>
        <h1>Manage Routines</h1>
      </div>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoutines)
