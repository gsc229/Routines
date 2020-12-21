import { VscActivateBreakpoints } from 'react-icons/vsc'
import * as constants from '../1_Actions'

const initialState = {
  crudingRoutine: false,
  saveRoutineChangesMode: false,
  unsavedChanges: false,
  error_message: '',
  pagination: null,
  routineSearchResults: [],
  userRoutines: '', // [{}]
  currentRoutineName: '', 
  currentRoutine: {
    name: '',
    category: '',
    muscle_group: '',
    target_muscle: '',
    description: '',
    difficulty_scale: '',
    start_date: '',
    end_date: ''
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
        currentRoutine: {}
      }
    case constants.FETCHING_ROUTINES:
      return {
        ...state,
        crudingRoutine: "fetching"
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
        pagination: action.payload.pagination
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
        currentRoutineName: action.payload.name
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
        currentRoutineName: action.payload.name
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
        return{
          ...state,
          crudingRoutine: false,
          currentRoutine: initialState.currentRoutine
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

    default: 
      return state

  }
}


export default reducer