import * as constants from '../1_Actions'

const initialState = {
  crudingRoutine: false,
  saveRoutineChangesMode: false,
  unsavedChanges: false,
  error_message: '',
  routinePagination: null,
  routineSearchResults: [],
  userRoutines: [], // [{}]
  currentRoutineName: '', 
  currentRoutine: {
    _id: null,
    user: null,
    name: null,
    category: null,
    muscle_group: null,
    target_muscle: null,
    description: null,
    difficulty_scale: null,
    start_date: null,
    end_date: null,
    weeks: []
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case constants.SET_CURRENT_ROUTINE:
      return{
        ...state,
        currentRoutine: action.payload,
        currentRoutineName: action.payload.name,
        unsavedChanges: false
      }
    case constants.CLEAR_ROUTINE_SEARCH_RESULTS:
      return{
        ...state,
        routineSearchResults: initialState.routineSearchResults
      }
    case  constants.WRITING_ROUTINE:
      return{
        ...state,
        unsavedChanges: true,
        currentRoutine: {
          ...state.currentRoutine,
          [action.payload.field]: action.payload.data
        }
      }
    case constants.CLEAR_CURRENT_ROUTINE:
      return{
        ...state,
        currentRoutine: initialState.currentRoutine,
        currentRoutineName: ''
      }
    case constants.FETCHING_ROUTINES:
      return {
        ...state,
        crudingRoutine: "fetching-routines"
      }
    case constants.FETCH_ROUTINES_FAIL:
      return {
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.FETCH_ROUTINES_SUCCESS:
      return {
        ...state,
        crudingRoutine: false,
        userRoutines: action.payload.data,
        routinePagination: action.payload.routinePagination
      }
    case constants.FETCHING_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingRoutine: 'fetching-routine'
      }
    case constants.FETCH_FLATTENED_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingRoutine: false,
        currentRoutine: action.payload.routine
      }
    case constants.FETCH_FLATTENED_ROUTINE_FAIL:
      return{
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.FETCHING_ROUTINE:
      return {
        ...state,
        crudingRoutine: "fetching-routine"
      }
    case constants.FETCH_ROUTINE_FAIL:
      return {
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.FETCH_ROUTINE_SUCCESS:
      return {
        ...state,
        crudingRoutine: false,
        currentRoutine: action.payload
      }
    case constants.CREATING_ROUTINE:
      return{
        ...state,
        crudingRoutine: "creating"
      }
    case constants.CREATE_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingRoutine: false,
        currentRoutineIsSaved: true,
        unsavedChanges: false,
        currentRoutine: action.payload,
        currentRoutineName: action.payload.name,
        userRoutines: [...state.userRoutines, action.payload]
      }
    case constants.CREATE_ROUTINE_FAIL:
      return {
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.UPDATING_ROUTINE:
      return{
        ...state,
        crudingRoutine: "updating"
      }
    case constants.UPDATE_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingRoutine: false,
        unsavedChanges: false,
        currentRoutine: action.payload,
        currentRoutineName: action.payload.name,
        userRoutines: state.userRoutines.map(routine => routine._id === action.payload._id ? action.payload : routine)
      }
    case constants.UPDATE_ROUTINE_FAIL:
      return{
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.DELETING_ROUTINE:
      return{
        ...state,
        crudingRoutine: "deleting"
      }
    case constants.DELETE_ROUTINE_SUCCESS:
      const routineId = action.payload._id ? action.payload._id : action.payload
      return{
        ...state,
        crudingRoutine: false,
        currentRoutine: initialState.currentRoutine,
        userRoutines: [...state.userRoutines.filter(routine => routine._id !== routineId)]
      }
    case constants.DELETE_ROUTINE_FAIL:
      return{
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.CLEAR_ERROR_MESSAGE: 
    return {
      ...state,
      error_message: ''
    }
    case constants.LOG_OUT:
      return {...initialState}

    default: 
      return state

  }
}


export default reducer