import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {logInUser, clearErrorMessage} from '../../1_Actions/userActions'
import {fetchRoutines} from '../../1_Actions/routineActions'
import { useHistory } from 'react-router-dom'
import { isDemo } from '../../config/config'
import {useLocation} from 'react-router-dom'
import LandingPageLayout from '../../6_Layouts/layout_two/LandingPageLayout.js'


export const LandingPage = ({
  logInUser, 
  fetchRoutines,
  loggedIn, 
}) => {

  

  const demoLogin = async() => {
    const data = await logInUser({email: 'user1@mail.com', password: 'user123'})
    const user = data.data
    console.log({user})
    await fetchRoutines(`?user=${user._id}&populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`)
  }

  if(isDemo && !loggedIn){
    demoLogin()
  }

  return (
    <LandingPageLayout>
      <h1>Landing Page</h1>
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
