import * as constants from '../1_Actions'

const initialState = {
  loggingIn: false,
  loggedIn: false,
  error_message: '',
  user: {}
}

const reducer = (state=initialState, action) => {
  switch(action.type){

    case constants.LOGGING_IN:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
        error_message: ''
      }
    case constants.LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        loggingIn: false,
        error_message: ''
      }
    case constants.LOG_IN_FAIL:
      return {
        ...state,
        error_message: action.payload,
        loggedIn: false,
        loggingIn: false
      }
    case constants.LOG_OUT: 
      return {
        ...initialState
      }
    case constants.CLEAR_ERROR_MESSAGE: 
      return {
        ...state,
        error_message: ''
      }
    default: 
      return state

  }
}


export default reducer