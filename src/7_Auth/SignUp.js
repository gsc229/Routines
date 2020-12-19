import React from 'react'
import { connect } from 'react-redux'
import LandingPageLayout from '../6_Layouts/layout_two/LandingPageLayout.js'
export const SignUp = () => {
  return (
    <LandingPageLayout>
      <h1>Create Account</h1>
    </LandingPageLayout>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
