import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { isDemo } from '../config/config'
import LandingPageLayout from '../6_Layouts/layout_two/LandingPageLayout.js'
import { logInUser } from '../1_Actions/userActions'
import {fetchRoutines} from '../1_Actions/routineActions'
import DarkSpinner from '../4_Components/spinners/DarkSpinner'
import { Check, CloseX } from '../4_Components/icons/Icons'

export const SignUp = ({
  logInUser, 
  creatingAccount,
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
  console.log({credentials})

  const isValidEmail = () => {
    const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return emailPattern.test(credentials.email)
  }

  const isMatch = () => {
    return credentials.password === credentials.passwordMatch 
  }

  const isValidPw = () => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

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
    logInUser(credentials)
  }

  const emailValidMessage = () => {
    if(isValidEmail()) return <p>Valid Email <Check /></p>
    if(!isValidEmail()) return <p>Email not valid <CloseX /></p>
  }

  const pwStrengthMessage = () => {
    if(isValidPw()) return <p>Valid Password <Check /></p>
    if(!isValidPw()) return <p>Password must be at least eight characters long. Must contain at least one number, one lowercase letter, one uppercase letter and one special character !@#$%^&*  <CloseX/></p>
  }

  const pwMatchMessage = () => {

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
            <label htmlFor='password'>Password: </label>
            <input
            disabled={creatingAccount} 
            onChange={handleChange}
            value={credentials.password}
            name='password'
            type="password"
            placeholder='password'
            className="password"/>
            <input
            disabled={creatingAccount} 
            onChange={handleChange}
            value={credentials.passwordMatch}
            name='passwordMatch'
            type="password"
            placeholder='retype password'
            className="password"/>
            <div className={`error-message-container ${error_message && 'open-container'}`}>
              <p className={`error-message ${error_message && ' hide-message'}`}>{error_message}</p>
            </div>
            <button
            disabled={!canSubmit() || creatingAccount}
            className="btn">
              Sign In
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
  logInUser,
  fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

