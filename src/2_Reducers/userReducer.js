import * as constants from '../1_Actions'

const initialState = {
  loggingIn: false,
  loggedIn: false,
  creatingAccount: false,
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

      case constants.CREATING_ACCOUNT:
        return {
          ...state,
          creatingAccount: true,
          loggedIn: false,
          error_message: ''
        }
      case constants.CREATE_ACCOUNT_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loggedIn: true,
          creatingAccount: false,
          error_message: ''
        }
      case constants.CREATE_ACCOUNT_FAIL:
        return {
          ...state,
          error_message: action.payload,
          loggedIn: false,
          creatingAccount: false
        }
      case constants.LOG_OUT: 
        return {
          ...initialState
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