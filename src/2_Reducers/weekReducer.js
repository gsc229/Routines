import * as constants from '../1_Actions'


const initialState = {
  crudingWeek: false,
  error_message: '',
  create_requirements: {
    user: "",
    routine: ""
  },
  currentRoutineWeeks: [],
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

    case constants.LOG_OUT:
      return initialState
    
    default: 
      return state

  }
}

export default reducer