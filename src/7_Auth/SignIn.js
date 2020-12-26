import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import LandingPageLayout from '../6_Layouts/layout_two/LandingPageLayout.js'
import {logInUser, clearErrorMessage} from '../1_Actions/userActions'
import {userRoutinesQuery} from '../1_Actions/routineActions'

export const SignIn = ({
  logInUser, 
  clearErrorMessage,
  userRoutinesQuery,
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

  useEffect(()=> {
    console.log(user._id)
    if(loggedIn){
      history.push('/')
      userRoutinesQuery(`user=${user._id}&populate_one=weeks&populate_two=set_groups&populate_three=exercise_sets&populate_four=exercise`)
    }

    if(error_message){
      setTimeout(() => {
        clearErrorMessage()
      }, 4000)
    }
  })

  const handleChange = (e) => {
    if(error_message){
      clearErrorMessage()
    }
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
      <div className ='container sign-in-container'>
        <div className="sign-in-form-container">
          <form action="" onSubmit={handleSubmit} className="auth-form signin-form">
            <h1>Sign In</h1>
            <input
            onChange={handleChange} 
            name='email'
            type="email" 
            placeholder='email'
            className="email"/>
            <input 
            onChange={handleChange}
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
  userRoutinesQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

