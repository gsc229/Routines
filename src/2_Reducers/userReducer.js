import { CLEAR_ERROR_MESSAGE, LOGGING_IN, LOG_IN_FAIL, LOG_IN_SUCCESS, LOG_OUT } from '../1_Actions/index'


const initialState = {
  loggingIn: false,
  loggedIn: false,
  error_message: '',
  user: {}
}

const reducer = (state=initialState, action) => {
  switch(action.type){

    case LOGGING_IN:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
        error_message: ''
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        loggingIn: false,
        error_message: ''
      }
    case LOG_IN_FAIL:
      return {
        ...state,
        error_message: action.payload,
        loggedIn: false
      }
    case LOG_OUT: 
      return {
        ...initialState
      }
    case CLEAR_ERROR_MESSAGE: 
      return {
        ...state,
        error_message: ''
      }
    default: 
      return state

  }
}


export default reducer