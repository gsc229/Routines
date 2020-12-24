import {signIn} from '../3_APIs/authApi'
import * as constants from '../1_Actions'

export const logInUser = (userInfo) => dispatch => {

  dispatch({type: constants.LOGGING_IN})

  signIn(userInfo)
  .then(response => {
    if(response.success){
      dispatch({type: constants.LOG_IN_SUCCESS, payload: response.data})
    } else if(response.error_message){
      dispatch({type: constants.LOG_IN_FAIL, payload: response.error_message})
    } else{
      dispatch({type: constants.LOG_IN_FAIL, payload: "Whoops! Something went wrong. Pleasee try again later. Sorry :("})
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