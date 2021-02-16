import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { isDemo } from '../config/config'
import LandingPageLayout from '../6_Layouts/layout_two/LandingPageLayout.js'
import {logInUser, clearErrorMessage} from '../1_Actions/userActions'
import {fetchRoutines} from '../1_Actions/routineActions'

export const SignIn = ({
  logInUser, 
  clearErrorMessage,
  fetchRoutines,
  user,  
  loggedIn, 
  error_message, 
  history
}) => {
  /* 
    test user:
    username: user1@mail.com
    password: user123
  */
 
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const disabled = credentials.email.length < 1 || credentials.password.length < 1

  const demoCredentials = {
    email: 'user1@mail.com',
    password: 'user123'
  }


  useEffect(()=> {
    if(loggedIn){
      history.push('/')
      const fetchUserRoutines = async () => {
        await fetchRoutines(`?user=${user._id}&populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`)
      }
      fetchUserRoutines()
    }
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isDemo){
      return logInUser({email: demoCredentials.email, password: demoCredentials.password})
    }
    logInUser(credentials)
  }

  


  return (
    <LandingPageLayout >
      <div className ='container sign-in-container'>
        <div className="sign-in-form-container">
          <form action="" onSubmit={handleSubmit} className="auth-form signin-form">
            <h1>{isDemo && 'Demo '}Sign In</h1>
            <input
            onChange={handleChange} 
            name='email'
            type="email" 
            value={isDemo ? demoCredentials.email : credentials.email}
            placeholder='email'
            className="email"/>
            <input 
            onChange={handleChange}
            value={isDemo ? demoCredentials.password : credentials.password}
            name='password'
            type="password"
            placeholder='password'
            className="password"/>
            <div className={`error-message-container ${error_message && 'open-container'}`}>
              <p className={`error-message ${error_message && ' hide-message'}`}>{error_message}</p>
            </div>
            <button
            disabled={disabled}
            className="btn">Sign In</button>
          </form>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

