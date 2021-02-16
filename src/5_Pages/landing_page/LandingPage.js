import React from 'react'
import { connect } from 'react-redux'
import {logInUser, clearErrorMessage} from '../../1_Actions/userActions'
import {fetchRoutines} from '../../1_Actions/routineActions'
import { isDemo } from '../../config/config'
import LandingPageLayout from '../../6_Layouts/layout_two/LandingPageLayout'
import LandingPageCarousel from './carousel/LandingPageCarousel'


export const LandingPage = ({
  logInUser, 
  fetchRoutines,
  loggedIn, 
}) => {

  

 

  return (
    <LandingPageLayout>
      <LandingPageCarousel />
    </LandingPageLayout>
  )

}

const mapStateToProps = (state) => ({
  loggingIn: state.userReducer.loggingIn,
  loggedIn: state.userReducer.loggedIn,
  error_message: state.userReducer.error_message,
  user: state.userReducer.user
})

const mapDispatchToProps = {
  logInUser,
  clearErrorMessage,
  fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
