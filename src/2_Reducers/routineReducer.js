import { FETCHING_USER_ROUTINES, FETCH_USER_ROUTINES_FAIL, FETCH_USER_ROUTINES_SUCCESS } from '../1_Actions'


const initialState = {
  fetchingRoutineData: false,
  editRoutineMode: false,
  error_message: '',
  pagination: null,
  userRoutines: '',
  currentRoutine: ''
}

const reducer = (state=initialState, action) => {
  switch(action.type){

    case FETCHING_USER_ROUTINES:
      return {
        ...state,
        fetchingRoutineData: true
      }
    case FETCH_USER_ROUTINES_FAIL:
      return {
        ...state,
        fetchingRoutineData: false,
        error_message: action.payload
      }
    case FETCH_USER_ROUTINES_SUCCESS:
      console.log("YAY!!! WE GOT IT!!!!")
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