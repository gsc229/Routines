import {LOGGING_IN, LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT, CLEAR_ERROR_MESSAGE} from './index'
import {signIn} from '../3_APIs/auth'

export const logInUser = (userInfo) => dispatch => {

  dispatch({type: LOGGING_IN})

  signIn(userInfo)
  .then(response => {
    if(response.success){
      dispatch({type: LOG_IN_SUCCESS, payload: response.data})
    } else if(response.error_message){
      dispatch({type: LOG_IN_FAIL, payload: response.error_message})
    } else{
      dispatch({type: LOG_IN_FAIL, payload: "Whoops! Something went wrong. Pleasee try again later. Sorry :("})
    }
  })

}

export const logout = () => dispatch => {
  localStorage.setItem('user', '')
  dispatch({type: LOG_OUT})
}

export const clearErrorMessage = () => dispatch => {
  dispatch({type: CLEAR_ERROR_MESSAGE})
}