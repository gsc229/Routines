import * as constants from '../1_Actions'


const initialState = {

  currentSetGroupSets: [],

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
    target_distance: null,
    target_laps: null,
    actual_reps: null,
    actual_weight: null,
    actual_time: null,
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
    case constants.SET_CURRENT_SET_GROUP_SETS:
      return{
        ...state,
        currentSetGroupSets: [...action.payload]
      }
    case constants.SET_CURRENT_EXERCISE_SET:
      return{
        ...state,
        currentExerciseSet: action.payload
      }

    case constants.CLEAR_CURRENT_EXERCISE_SET: 
      return{
        ...state,
        currentExerciseSet: initialState.currentExerciseSet
      }

    case constants.CLEAR_CURRENT_SET_GROUP_SETS:
      return{
        ...state,
        currentSetGroupSets: initialState.currenSetGroupSets
      }
    

    case constants.LOG_OUT:
      return initialState
    default: 
      return state

  }
}

export default reducer