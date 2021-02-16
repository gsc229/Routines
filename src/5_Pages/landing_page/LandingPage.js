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

  

  const demoLogin = async() => {
    const data = await logInUser({email: 'user1@mail.com', password: 'user123'})
    const user = data.data
    await fetchRoutines(`?user=${user._id}&populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`)
  }

  if(isDemo && !loggedIn){
    demoLogin()
  }

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
