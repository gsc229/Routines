import * as constants from '../1_Actions'


const initialState = {
  crudingWeek: false,
  error_message: '',
  create_requirements: {
    user: "",
    routine: ""
  },
  currentWeeks: [],
  currentWeek: {
    routine: null,
    user: null,
    week_number: null,
    week_of_year: null,
    week_start_date: null,
    year: null,
    set_groups: [] 
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case constants.SET_CURRENT_WEEK:
      return{
        ...state,
        currentWeek: action.payload
      }
    case constants.CLEAR_CURRENT_WEEK:
      return{
        ...state,
        currentWeek: initialState.currentWeek
      }
    case  constants.WRITING_WEEK:
      return{
        ...state,
        currentWeek: {
          ...state.currentWeek,
          [action.payload.field]: action.payload.string
        }
      }
    case constants.CLEAR_ERROR_MESSAGE: 
      return {
        ...state,
        error_message: ''
      }

    /* ASYCN ACTIONS */
    // interdependant
    case constants.FETCHING_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingWeek: 'fetching-weeks'
      }
    case constants.FETCH_FLATTENED_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeeks: action.payload.weeks
      }
    case constants.FETCH_FLATTENED_ROUTINE_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    // independant
    case constants.FETCHING_WEEKS:
      return{
        ...state,
        crudingWeek: 'fetching-weeks'
      }
    case constants.FETCH_WEEKS_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    case constants.FETCH_WEEKS_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentRoutineWeeks: action.payload
      }
    case constants.FETCHING_WEEK:
      return{
        ...state,
        crudingWeek: 'fetching-week'
      }
    case constants.FETCH_WEEK_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    case constants.FETCH_WEEK_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeek: action.payload
      }
    case constants.CREATING_WEEK:
      return{
        ...state,
        crudingWeek: "creating-week"
      }
    case constants.CREATE_WEEK_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeek: action.payload,
        currentWeeks: [...state.currentWeeks, action.payload]
      }
    case constants.CREATE_WEEK_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    case constants.UPDATING_WEEK:
      return{
        ...state,
        crudingWeek: "updating-week"
      }
    case constants.UPDATE_WEEK_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeek: action.payload,
        currentRoutine: [...state.currentWeeks.map(week => week._id = action.payload._id ? action.payload._id : week)]
      }
    case constants.UPDATE_WEEK_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    case constants.DELETING_WEEK:
      return{
        ...state,
        crudingWeek: "deleting-week"
      }
    case constants.DELETE_WEEK_SUCCESS:
      const weekId = action.payload._id ? action.payload._id : action.payload
      return{
        ...state,
        crudingWeek: false,
        currentWeek: initialState.currentWeek,
        currentWeeks:  [...state.currentWeeks.filter(week => week._id !== weekId)]  
      }
    case constants.DELETE_WEEK_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }






    case constants.LOG_OUT:
      return initialState
    
    default: 
      return state

  }
}

export default reducer