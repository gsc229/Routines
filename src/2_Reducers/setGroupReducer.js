import * as constants from '../1_Actions'


const initialState = {}

const reducer = (state=initialState, action) => {
  switch(action.type){


  case constants.LOG_OUT:
    return initialState

  default: 
    return state

  }
}

export default reducer