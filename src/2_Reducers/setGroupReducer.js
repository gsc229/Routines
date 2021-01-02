import * as constants from '../1_Actions'


 const setGroupTypes = [
  "Manual",
  "Straight",
  "Super",
  "Super - Antagonist", 
  "Super - Compound", 
  "Super - Tri", 
  "Super - Giant", 
  "Circuit", 
  "Pyramid",
  "Drop",
  "Stripping",
  "Rest - Pause",
  "Pre-Exhaustion"]



const initialState = {
  set_group_types: setGroupTypes,
  crudingSetGroup: false,
  error_message: '',
  chosenExercises: [],
  mulipleExercises: false,
  lockedInType: "",
  createSetGroupData: {
    currentStep: "choose-type",
    is_compound: false,
    total_sets: "",
    rep_max: "",
    reps_per_set: "",
    starting_weight: "",
    starting_time: "",
    starting_distance: "",
    reps_increase: "",
    reps_decrease: "",
    percent_weight_decrease: "",
    percent_weight_increase: "",
    percent_time_decrease: "",
    percent_time_increase: "",
    percent_distance_decrease: "",
    percent_distance_increase: "",
    weight_decrease: "",
    weight_increase: "",
    time_decrease: "",
    time_increase: "",
    distance_decrease: "",
    distance_increase: "",
    rest_time: "",
    rest_time_increase: "",
    rest_time_decrease: ""
  },

  currentSetGroup: {
    routine: null, //required
    week: null, //required
    user: null, //required
    week_number: null, //required
    day_number: null, //required
    day: null,
    set_group_type: "Straight",
    name: null,
    scheduled_time: null,
    completed_time: null,
    order: null,
    target_sets: null,
    actual_sets: null,
  }
  
}

const reducer = (state=initialState, action) => {
  switch(action.type){
  
  case constants.SET_CURRENT_SET_GROUP:
    return{
      ...state,
      currentSetGroup: action.payload
    }
  case  constants.WRITING_CURRENT_SET_GROUP: 
    return{
      ...state,
      currentSetGroup:{
        ...state.currentSetGroup,
        [action.payload.key]: action.payload.value
      }
    }
  case constants.WRITING_CREATE_SET_GROUP_DATA:
    return {
      ...state,
      createSetGroupData: {
        ...state.createSetGroupData,
        [action.payload.key]: action.payload.value
      }
    }
  case constants.CLEAR_CURRENT_SET_GROUP:
    return{
      ...state,
      currentSetGroup: initialState.currentSetGroup
    }
  case constants.CLEAR_CREATE_SET_GROUP_DATA:
    return{
      ...state,
      createSetGroupData: initialState.createSetGroupData
    }
  case constants.LOCK_IN_TYPE: 
    return{
      ...state,
      lockedInType: action.payload
    }
  case constants.ADD_TO_CHOSEN_EXERCISES:
    return{
      ...state,
      chosenExercises: [...state.chosenExercises, action.payload]
    }
  case constants.REMOVE_FROM_CHOSEN_EXERCISES:
    return{
      ...state,
      chosenExercises: [...state.chosenExercises.filter(exercise => exercise._id !== action.payload)]
    }
  case constants.CREATING_SET_GROUP:
    return{
      ...state,
      crudingSetGroup: 'creating-set-group'
    }
  case constants.CREATE_SET_GROUP_SUCCESS:
    return{
      ...state,
      crudingSetGroup: false,
      currentSetGroup: action.payload
    }
  case constants.CREATE_SET_GROUP_FAIL: 
    return{
      ...state,
      crudingSetGroup: false,
      error_message: action.payload
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