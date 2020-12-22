import * as constants from '../1_Actions'


const initialState = {
  CRUD_requirements: {
    user: "",
  },
  crudingExercise: false,
  unsavedChanges: false,
  error_message: '',
  exercisePagination: null,
  exerciseSearchResults: [],
  userExercises: '', // [{}]
  currentExercise: {
    name: null,
    category: null,
    difficulty: null,
    difficulty_scale: null,
    description: null,
    original_creator: null,
    body_part: null,
    muscle_group: null,
    target_muscle: null,
    equipment: null,
    video_url: null,
    created_at: null
  }
}





const reducer = (state=initialState, action) => {
  switch(action.type){

    case constants.SET_CURRENT_EXERCISE:
      return{
        ...state,
        currentExercise: action.payload,
        currentExerciseName: action.payload.name,
        unsavedChanges: false
      }
    case  constants.WRITING_EXERCISE:
      return{
        ...state,
        unsavedChanges: true,
        currentExercise: {
          ...state.currentExercise,
          [action.payload.field]: action.payload.data
        }
      }
    case constants.CLEAR_CURRENT_EXERCISE:
      return{
        ...state,
        currentExercise: initialState.currentExercise,
        currentExerciseName: ''
      }
    case constants.FETCHING_EXERCISES:
      return {
        ...state,
        crudingExercise: "fetching"
      }
    case constants.FETCH_EXERCISES_FAIL:
      return {
        ...state,
        crudingExercise: false,
        error_message: action.payload
      }
    case constants.FETCH_EXERCISES_SUCCESS:
      return {
        ...state,
        crudingExercise: false,
        userExercises: action.payload.data,
        exercisePagination: action.payload.exercisePagination
      }
    case constants.CREATING_EXERCISE:
      return{
        ...state,
        crudingExercise: "creating"
      }
    case constants.CREATE_EXERCISE_SUCCESS:
      return{
        ...state,
        crudingExercise: false,
        currentExerciseIsSaved: true,
        unsavedChanges: false,
        currentExercise: action.payload,
        currentExerciseName: action.payload.name
      }
    case constants.CREATE_EXERCISE_FAIL:
      return {
        ...state,
        crudingExercise: false,
        error_message: action.payload
      }
    case constants.UPDATING_EXERCISE:
      return{
        ...state,
        crudingExercise: "updating"
      }
    case constants.UPDATE_EXERCISE_SUCCESS:
      return{
        ...state,
        crudingExercise: false,
        unsavedChanges: false,
        currentExercise: action.payload,
        currentExerciseName: action.payload.name
      }
    case constants.UPDATE_EXERCISE_FAIL:
      return{
        ...state,
        crudingExercise: false,
        error_message: action.payload
      }
      case constants.DELETING_EXERCISE:
        return{
          ...state,
          crudingExercise: "deleting"
        }
      case constants.DELETE_EXERCISE_SUCCESS:
        return{
          ...state,
          crudingExercise: false,
          currentExercise: initialState.currentExercise
        }
      case constants.DELETE_EXERCISE_FAIL:
        return{
          ...state,
          crudingExercise: false,
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