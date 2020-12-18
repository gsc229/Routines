import { FETCHING_USER_ROUTINES, FETCH_USER_ROUTINES_FAIL, FETCH_USER_ROUTINE_SUCCESSS } from '../1_Actions'


const initialState = {
  fetchingRoutineData: false,
  editRoutineMode: false,
  error_message: '',
  pagination: null,
  userRoutines: JSON.parse(localStorage.getItem('userRoutines')) || [],
  currentRoutine: JSON.parse(localStorage.getItem('currentRoutine')) || {}
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
    case FETCH_USER_ROUTINE_SUCCESSS:
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