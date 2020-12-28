import * as constants from '../1_Actions'


const initialState = {

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
    target_weight_kg: null,
    rest_time: null,
    target_time: null,
    target_distance_km: null,
    target_laps: null,
    actual_reps: null,
    actual_weight_kg: null,
    actual_time: null,
    actual_distance_km: null,
    actual_laps: null
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type){

    case constants.SET_CURRENT_SET_GROUP:{
      return{
        ...state,
        currentExerciseSet: {
          ...state.currentExerciseSet,
          exercise: action.payload.exercise,
          routine: action.payload.routine,
          week: action.payload.week,
          set_group: action.payload._id,
          user: action.payload.user
        }
      }
    }
    case constants.CREATE_SET_GROUP_SUCCESS: {
      return{
        ...state,
        currentExerciseSet: {
          set_group: action.payload._id
        }
      }
    }

    case constants.LOG_OUT:
      return initialState
    default: 
      return state

  }
}

export default reducer