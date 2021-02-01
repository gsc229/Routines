import * as constants from '../1_Actions'


const initialState = {
  crudingWeek: false,
  error_message: '',
  create_requirements: {
    user: "",
    routine: ""
  },
  currentWeeks: [],
  scheduleDnDSelectedWeekNumbers: ['all'], // or [3, 5, 7, ...etc]
  currentWeek: {
    routine: null,
    user: null,
    week_number: null,
    week_of_year: null,
    week_start_date: null,
    year: null,
    set_groups: [],
    copied_from: null
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case constants.SET_CURRENT_WEEK:
      return{
        ...state,
        currentWeek: action.payload
      }
    case constants.SET_SELECTED_WEEK_NUMBER:
      return{
        ...state,
        scheduleDnDSelectedWeekNumbers: action.payload
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
    /* NON ASYNC Interdependent */
    case constants.SET_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingWeek: false,
        currentWeeks: action.payload.weeks.sort((a, b) => a.week_number - b.week_number)
    }
    /* ASYNC ACTIONS */
    // interdependent
    case constants.FETCHING_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingWeek: 'fetching-weeks'
      }
    case constants.FETCH_FLATTENED_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeeks: action.payload.weeks.sort((a, b) => a.week_number - b.week_number)
      }
    case constants.FETCH_FLATTENED_ROUTINE_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    // independent
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
        currentRoutineWeeks: action.payload.sort((a, b) => a.week_number - b.week_number)
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
        currentWeeks: [
          ...state.currentWeeks, action.payload
        ]
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
        currentWeeks: [
          ...state.currentWeeks
          .map(week => week._id === action.payload._id ? action.payload : week)
          .sort((a, b) => a.week_number - b.week_number)
        ]
      }
    case constants.UPDATE_WEEK_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    case constants.BULK_WRITING_WEEKS:
      return{
        ...state,
        crudingWeek: 'bulk-writing-weeks'
      }
    case constants.BULK_WRITE_WEEKS_SUCCESS:
      // success will always return all the remaining/modified/created sets of a single set group (populated with exercise)
      return{
        ...state,
        crudingWeek: false,
        currentWeeks: action.payload.data.sort((a, b) => a.week_number - b.week_number)
      }
    case constants.BULK_WRITE_WEEKS_FAIL:
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