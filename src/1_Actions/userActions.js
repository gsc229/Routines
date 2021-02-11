import {signIn} from '../3_APIs/authApi'
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