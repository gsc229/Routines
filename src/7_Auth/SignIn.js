import React, { Component } from 'react'
import { connect } from 'react-redux'
import LandingPageLayout from '../6_Layouts/layout_two/LandingPageLayout.js'
export const SignIn = () => {
  return (
    <LandingPageLayout >
      <h1>Sign In</h1>
    </LandingPageLayout>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

