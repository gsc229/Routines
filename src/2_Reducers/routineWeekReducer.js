import * as constants from '../1_Actions'


const initialState = {
  crudingWeek: false,
  error_message: '',
  create_requirements: {
    user: "",
    routine: ""
  },
  allWeeks: [],
  currentWeek: {}
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case  constants.WRITING_WEEK:
      return{
        ...state,
        currentWeek: {
          ...state.currentWeek,
          [action.payload.field]: action.payload.string
        }
      }
    case constants.FETCHING_WEEKS:
      return {
        ...state,
        crudingWeek: "fetching"
      }
    case constants.FETCH_WEEKS_FAIL:
      return {
        ...state,
        crudingWeek: false,
        error_message: action.payload
      }
    case constants.FETCH_WEEKS_SUCCESS:
      return {
        ...state,
        crudingWeek: false,
        userRoutines: action.payload.data,
        weeksPagination: action.payload.weeksPagination
      }
    case constants.CREATING_WEEK:
      return{
        ...state,
        crudingWeek: "creating"
      }
    case constants.CREATE_WEEK_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeek: action.payload
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
        crudingWeek: "updating"
      }
    case constants.UPDATE_WEEK_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeek: action.payload
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
        crudingWeek: "deleting"
      }
    case constants.DELETE_WEEK_SUCCESS:
      return{
        ...state,
        crudingWeek: false,
        currentWeek: {}
      }
    case constants.DELETE_WEEK_FAIL:
      return{
        ...state,
        crudingWeek: false,
        error_message: action.payload
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