import * as constants from '../1_Actions'


const initialState = {
  crudingExerciseSet: false,
  error_message: '',
  currentRoutineSets: [],
  currentExerciseSets: [],
  currentExerciseSet: {
    exercise: null, // required
    routine: null, // required
    week: null, // required
    set_group: null, // required
    user: null, // required
    day: null , //["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    day_number: null,
    order: null,
    difficulty: null, // ["Easy", "Medium", "Hard", "Extreme", "", null]
    difficulty_scale: null, // 1 to 10
    scheduled_time: null,
    completed_time: null,
    target_reps: null,
    target_weight: null,
    rest_time: null,
    target_time: null,
    target_hours: null,
    target_minutes: null,
    target_seconds: null, 
    target_distance: null,
    target_laps: null,
    actual_reps: null,
    actual_weight: null,
    actual_time: null,
    actual_hours: null,
    actual_minutes: null,
    actual_seconds: null, 
    actual_distance: null,
    actual_laps: null
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    // every time a set group is set or created, initialize the required fields for
    // creating / updating an exercise set
    case constants.SET_CURRENT_SET_GROUP:{
      return{
        ...state,
        currentExerciseSets: [...state.currentRoutineSets.filter(exSet => exSet.set_group  === action.payload._id)],
        currentExerciseSet: {
          ...state.currentExerciseSet,
          routine: action.payload.routine,
          week: action.payload.week,
          set_group: action.payload._id,
          user: action.payload.user
        }
      }
      } // same comment as above
    case constants.CREATE_SET_GROUP_SUCCESS: {  
      return{
        ...state,
        currentExerciseSet: {
          routine: action.payload.routine,
          week: action.payload.week,
          set_group: action.payload._id,
          user: action.payload.user
        }
      }
      }
    case constants.SET_CURRENT_EXERCISE_SET:
      return{
        ...state,
        currentExerciseSet: action.payload
      }
    case constants.ADD_TO_CURRENT_EXERCISE_SETS:
      return{
        ...state,
        currentExerciseSets: [...state.currentExerciseSets, action.payload]
      }
    case constants.REMOVE_FROM_CURRENT_EXERCISE_SETS_BY_EX_ID:
      return{
        ...state,
        currentExerciseSets: 
        [
          ...state.currentExerciseSets
          .filter(set => set.exercise._id ? set.exercise._id !== action.payload : set.exercise !== action.payload)
        ]
      }
    case constants.LOCAL_BULK_WRITE_CURRENT_EXERCISE_SETS:
      // locally still may need to remove from currentRouinteSets in cases where a delete failed because an exericse was deleted from the backed, 
      // but for some reason was not removed from the cRss
      return{
        ...state,
        currentExerciseSets: action.payload.data
      }
    case constants.SET_CURRENT_EXERCISE_SETS:
      return{
        ...state,
        currentExerciseSets: action.payload
      }
    case constants.WRITING_EXERCISE_SET:
      return{
        ...state,
        currentExerciseSet:{
          ...state.currentExerciseSet,
          [action.payload.key]: action.payload.value
        }
      }
    case constants.CLEAR_CURRENT_EXERCISE_SET: 
      return{
        ...state,
        currentExerciseSet: initialState.currentExerciseSet
      }
    case constants.CLEAR_CURRENT_EXERCISE_SETS:
      return{
        ...state,
        currentExerciseSets: initialState.currentExerciseSets
      }
    /* NON ASNYC Interdependent */
    case constants.SET_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingExerciseSet: false,
        currentRoutineSets: action.payload.exercise_sets ? action.payload.exercise_sets.sort((a, b) => a.order - b.order) : []
      }
    /* ASYNC   */
    // single set
    case constants.CREATING_EXERCISE_SET:
      return{
        ...state,
        crudingExerciseSet: 'creating-exercise-set'
      }
    case constants.CREATE_EXERCISE_SET_SUCCESS:
      return{
        ...state,
        crudingExerciseSet: false,
        currentExerciseSets: [...state.currentExerciseSets, action.payload],
        currentRoutineSets: [...state.currentRoutineSets, action.payload]
      }
    case constants.CREATE_EXERCISE_SET_FAIL:
      return{
        ...state,
        crudingExerciseSet: false,
        error_message: action.payload
      }
    //multiple sets
    case constants.CREATING_EXERCISE_SETS:
      return{
        ...state,
        crudingExerciseSet: 'creating-exercise-sets'
      }
    case constants.CREATE_EXERCISE_SETS_SUCCESS:
      // success of multiple sends back all the sets of a set group so...
      // just set currentExerciseSets equal to action.payload
      return{
        ...state,
        crudingExerciseSet: false,
        currentExerciseSets: action.payload,
        currentRoutineSets: [...state.currentRoutineSets, ...action.payload]
      }
    case constants.CREATE_EXERCISE_SETS_FAIL:
      return{
        ...state,
        crudingExerciseSet: false,
        error_message: action.payload
      }
    case constants.UPDATING_EXERCISE_SET:
      return{
        ...state,
        crudingExerciseSet: 'updating-exercise-set'
      }
    case constants.UPDATE_EXERCISE_SET_SUCCESS:
      return{
        ...state,
        crudingExerciseSet: false,
        currentExerciseSet: action.payload,
        currentExerciseSets: [
          ...state.currentExerciseSets.map(exSet => exSet._id === action.payload._id ? action.payload: exSet)
        ],
        currentRoutineSets: [
          ...state.currentRoutineSets.map(exSet => exSet._id === action.payload._id ? action.payload: exSet)
        ]
      }
    case constants.UPDATE_EXERCISE_SET_FAIL:
      return{
        ...state,
        crudingExerciseSet: false,
        error_message: action.payload
      }
    case constants.BULK_WRITING_EXERCISE_SETS:
      return{
        ...state,
        crudingExerciseSet: 'bulk-wrtiting-exercise-sets'
      }
    case constants.BULK_WRITE_EXERCISE_SETS_SUCCESS:
      // success will always return all the remaining/modified/created sets of a single set group (populated with exercise)
      // when sets are deleted look for set_group in findByObj. Need to do it this way for cases where there are no remaining sets 
      // from which to determine the set_group 
      const {routine, set_group} = action.payload.findByObj
      
      return{
        ...state,
        crudingExerciseSet: false,
        currentExerciseSets: action.payload.data.sort((a, b) => a.order - b.order),
        currentRoutineSets: routine ? action.payload.data : [...state.currentRoutineSets.filter(set => set.set_group !== set_group), ...action.payload.data].sort((a, b) => a.order - b.order)
         
      }
    case constants.BULK_WRITE_EXERCISE_SETS_FAIL:
      return{
        ...state,
        crudingExerciseSet: false,
        error_message: action.payload
      }
    case constants.DELETING_EXERCISE_SET:
      return{
        ...state,
        crudingExerciseSet: 'deleteing-exercise-set'
      }
    case constants.DELETE_EXERCISE_SET_SUCCESS:
      return{
        ...state,
        crudingExerciseSet: false,
        currentRoutineSets: [...state.currentRoutineSets.filter(set => set._id !== action.payload._id)],
        currentExerciseSets: [...state.currentExerciseSets.filter(set => set._id !== action.payload._id)]
      }
    case constants.DELETE_EXERCISE_SET_FAIL:
      return{
        ...state,
        crudingExerciseSet: false,
        error_message: action.payload
      }
    
    // interdependent
    case constants.FETCHING_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingExerciseSet: 'fetching-exercise-sets'
      }
    case constants.FETCH_FLATTENED_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingExerciseSet: false,
        currentRoutineSets: action.payload.exercise_sets.sort((a, b) => a.order - b.order)
      }
    case constants.FETCH_FLATTENED_ROUTINE_FAIL:
      return{
        ...state,
        crudingExerciseSet: false,
        error_message: action.payload
      }
    case constants.DELETE_ROUTINE_SUCCESS:
      return{
        ...state,
        currentExerciseSets: initialState.currentExerciseSets,
        currentRoutineSets: initialState.currentRoutineSets
      }
    case constants.DELETE_WEEK_SUCCESS:
      const weekId = action.payload._id ? action.payload._id : action.payload
      return{
        ...state,
        currentRoutineSets: [
          ...state.currentRoutineSets.filter(exSet => exSet.week !== weekId)
        ],
        currentExerciseSets: [
          ...state.currentExerciseSets.filter(exSet => exSet.week !== weekId)
        ]
      }
    case constants.DELETE_SET_GROUP_SUCCESS:
      const setGroupId = action.payload._id ? action.payload._id : action.payload
      return{
        ...state,
        currentRoutineSets: [
          ...state.currentRoutineSets.filter(exSet => exSet.set_group !== setGroupId)
        ],
        currentExerciseSets: initialState.currentExerciseSets
      }
    case constants.CLEAR_ERROR_MESSAGE:
      return{
        ...state,
        error_message: ''
      }
    case constants.LOG_OUT:
      return initialState
    default: 
      return state

  }
}

export default reducer