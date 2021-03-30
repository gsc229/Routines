import {signIn, registger} from '../3_APIs/authApi'
import * as constants from '../1_Actions'

export const logInUser = (userInfo) => dispatch => {

  dispatch({type: constants.LOGGING_IN})

  return signIn(userInfo)
  .then(response => {
    if(response && response.success){
      dispatch({type: constants.LOG_IN_SUCCESS, payload: response.data})
      return response
    } else if(response && response.error_message){
      dispatch({type: constants.LOG_IN_FAIL, payload: response.error_message})
      return response
    } else{
      dispatch({type: constants.LOG_IN_FAIL, payload: "Whoops! Something went wrong. Pleasee try again later. Sorry :("})
      return response
    }
  })

}

export const logout = () => dispatch => {
  dispatch({type: constants.LOG_OUT})
  
  localStorage.removeItem('state')
  localStorage.removeItem('token')
  
}

export const clearErrorMessage = () => dispatch => {
  dispatch({type: constants.CLEAR_ERROR_MESSAGE})
}


export const createAccount = (newUserInfo) => dispatch => {
  dispatch({type: constants.CREATING_ACCOUNT})

  return registger(newUserInfo)
  .then(response => {
    if(response && response.success){
      dispatch({type: constants.CREATE_ACCOUNT_SUCCESS, payload: response.data})
      return response
    } else if(response && response.error_message){
      dispatch({type: constants.CREATE_ACCOUNT_FAIL, payload: response.error_message})
      return response
    } else{
      dispatch({type: constants.CREATE_ACCOUNT_FAIL, payload: "Whoops! Something went wrong. Pleasee try again later. Sorry :("})
      return response
    }
  })

}