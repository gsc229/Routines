import React from 'react'
import { connect } from 'react-redux'
import {useLocation} from 'react-router-dom'
import LandingPageLayout from '../../6_Layouts/layout_two/LandingPageLayout.js'


export const LandingPage = () => {
  const location = useLocation()
  console.log({location})
  return (
    <LandingPageLayout>
      <h1>Landing Page</h1>
    </LandingPageLayout>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
