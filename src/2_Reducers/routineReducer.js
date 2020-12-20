import * as constants from '../1_Actions'

const initialState = {
  fetchingRoutineData: false,
  editRoutineMode: false,
  error_message: '',
  pagination: null,
  userRoutines: '',
  currentRoutine: {}
}

const reducer = (state=initialState, action) => {
  switch(action.type){

    case  constants.WRITING_ROUTINE:
      return{
        ...state,
        currentRoutine: {
          ...state.currentRoutine,
          [action.payload.field]: action.payload.string
        }
      }

    case constants.FETCHING_USER_ROUTINES:
      return {
        ...state,
        fetchingRoutineData: true
      }
    case constants.FETCH_USER_ROUTINES_FAIL:
      return {
        ...state,
        fetchingRoutineData: false,
        error_message: action.payload
      }
    case constants.FETCH_USER_ROUTINES_SUCCESS:
      return {
        ...state,
        fetchingRoutineData: false,
        userRoutines: action.payload.data,
        pagination: action.payload.pagination
      }

    default: 
      return state

  }
}


export default reducer