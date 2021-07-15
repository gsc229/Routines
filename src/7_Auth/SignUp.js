import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { isDemo } from '../config/config'
import LandingPageLayout from '../6_Layouts/layout_two/LandingPageLayout.js'
import { createAccount } from '../1_Actions/userActions'
import {fetchRoutines} from '../1_Actions/routineActions'
import DarkSpinner from '../4_Components/spinners/DarkSpinner'
import { Check, CloseX } from '../4_Components/icons/Icons'
import Alert from 'react-bootstrap/Alert'
import {useHistory} from 'react-router-dom'

export const SignUp = ({
  createAccount, 
  creatingAccount,
  fetchRoutines,
  user,  
  loggedIn, 
  error_message
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

  const history = useHistory()

  const signInMessage = "Creating Account.."
  

  const isValidEmail = () => {
    const emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailPattern.test(credentials.email)
  }

  const isMatch = () => {
    return credentials.password === credentials.passwordMatch 
  }

  const isValidPw = () => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")

    const isStrong = strongRegex.test(credentials.password)

    return isStrong 
  }

  const canSubmit = () => {
    return isValidEmail() && isValidPw() && isMatch()
  }

  console.log({isValidEmail: isValidEmail(), isValidPw: isValidPw(), isMatch: isMatch(), canSubmit: canSubmit(), email: credentials.email, pw: credentials.password, pwMatch: credentials.passwordMatch})

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
    createAccount(credentials)
  }

  const emailValidMessage = () => {
    if(isValidEmail()) return <p>Valid email <Check styles={{color: 'lime'}} /></p>
    if(!isValidEmail()) return <p><CloseX styles={{color: 'red'}} /> Email not valid</p>
  }

  const pwStrengthMessage = () => {
    if(isValidPw()) return <p>Valid password <Check styles={{color: 'lime'}} /></p>
    if(!isValidPw()) return <p>{credentials.password.length > 1 && <CloseX styles={{color: 'red'}}/>} Password must be at least eight characters long. Must contain at least one number, one lowercase letter, one uppercase letter and one special character !@#$%^&*</p>
  }

  const pwMatchMessage = () => {
    if(isMatch()) return <p>Passwords match <Check styles={{color: 'lime'}} /></p>

    if(!isMatch()) return <p><CloseX styles={{color: 'red'}}/> Passwords do not match</p>
  }

  const getErrorMessage = () => {
    if(error_message.includes('duplicate key')) return "An account with that email already exists. Please sign in."
    
    return error_message
  }
  
  return (
    <LandingPageLayout >
      <div className ='container sign-up-container'>
        <div className="sign-up-form-container">
          <form action="" onSubmit={handleSubmit} className="auth-form signup-form">
            <h1>{isDemo && 'Demo '}Sign Up</h1>
            <label htmlFor='email'>Email:</label>
            <input
            disabled={creatingAccount}
            onChange={handleChange} 
            name='email'
            type="email" 
            value={credentials.email}
            placeholder='email'
            className="email"/>
            {credentials.email.length > 1 && emailValidMessage()}
            <label htmlFor='password'>Password: </label>
            <input
            disabled={creatingAccount} 
            onChange={handleChange}
            value={credentials.password}
            name='password'
            type="password"
            placeholder='password'
            className="password"/>
            {pwStrengthMessage()}
            <input
            disabled={creatingAccount} 
            onChange={handleChange}
            value={credentials.passwordMatch}
            name='passwordMatch'
            type="password"
            placeholder='retype password'
            className="password"/>
            {credentials.passwordMatch.length > 1 && pwMatchMessage()}
            <div className={`error-message-container ${error_message && 'open-container'}`}>
              <Alert 
              variant='danger'
              className={`error-message ${error_message && ' show-message'}`}>
                {getErrorMessage()}
              </Alert>
            </div>
            <button
            disabled={!canSubmit() || creatingAccount}
            className="btn">
              Sign Up
            </button>
          </form>
          {creatingAccount && <DarkSpinner style={{height: '100px'}} text={signInMessage} />}
        </div>
      </div>
    </LandingPageLayout>
  )
}

const mapStateToProps = (state) => ({
  creatingAccount: state.userReducer.creatingAccount,
  loggedIn: state.userReducer.loggedIn,
  error_message: state.userReducer.error_message,
  user: state.userReducer.user
})

const mapDispatchToProps = {
  createAccount,
  fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

