import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { isDemo } from '../config/config'
import LandingPageLayout from '../6_Layouts/layout_two/LandingPageLayout.js'
import { logInUser } from '../1_Actions/userActions'
import {fetchRoutines} from '../1_Actions/routineActions'
import DarkSpinner from '../4_Components/spinners/DarkSpinner'

export const SignUp = ({
  logInUser, 
  loggingIn,
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
    password: '',
    passwordMatch: ''
  })

  const disabled = !isDemo && (credentials.email.length < 1 || credentials.password.length < 1)

  const signInMessage = "Creating Account.."

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
    logInUser(credentials)
  }
  
  return (
    <LandingPageLayout >
      <div className ='container sign-up-container'>
        <div className="sign-up-form-container">
          <form action="" onSubmit={handleSubmit} className="auth-form signup-form">
            <h1>{isDemo && 'Demo '}Sign Up</h1>
            <label htmlFor='email'>Email:</label>
            <input
            disabled={loggingIn}
            onChange={handleChange} 
            name='email'
            type="email" 
            value={credentials.email}
            placeholder='email'
            className="email"/>
            <label htmlFor='password'>Password: </label>
            <input
            disabled={loggingIn} 
            onChange={handleChange}
            value={credentials.password}
            name='password'
            type="password"
            placeholder='password'
            className="password"/>
            <input
            disabled={loggingIn} 
            onChange={handleChange}
            value={credentials.password}
            name='passwordMatch'
            type="password"
            placeholder='retype password'
            className="password"/>
            <div className={`error-message-container ${error_message && 'open-container'}`}>
              <p className={`error-message ${error_message && ' hide-message'}`}>{error_message}</p>
            </div>
            <button
            disabled={disabled || loggingIn}
            className="btn">
              Sign In
            </button>
          </form>
          {loggingIn && <DarkSpinner style={{height: '100px'}} text={signInMessage} />}
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
  fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

