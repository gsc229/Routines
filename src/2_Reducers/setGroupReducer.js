import { act } from 'react-dom/test-utils'
import { ReactReduxContext } from 'react-redux'
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
  mulipleExercises: false,
  lockedInType: "",
  createSetGroupData: {
    mode: 'creating-new',
    currentStep: "choose-type",
    currentExerciseSetIndex: 0,
    is_compound: false,
    total_sets: "",
    rep_max: "",
    starting_reps: "",
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
  /* ASYNC ACTIONS */
  case constants.FETCHING_SET_GROUPS:
    return{
      ...state,
      crudingSetGroup: 'fetching-set-groups'
    }
  case constants.FETCH_SET_GROUPS_SUCCESS:
    return{
      ...state,
      crudingSetGroup: false,
      currentSetGroups: [
        ...state.currentSetGroups
        .map(localSg => {
          const foundIncomingSg = action.payload.find(sg => sg._id === localSg._id)
          return foundIncomingSg ? foundIncomingSg : localSg
        })]
    }
  case constants.FETCH_SET_GROUPS_FAIL:
    return{
      ...state,
      crudingSetGroup: false,
      error_message: action.payload
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
      currentSetGroup: action.payload,
      currentSetGroups: [...state.currentSetGroups, action.payload]
    }
  case constants.CREATE_SET_GROUP_FAIL: 
    return{
      ...state,
      crudingSetGroup: false,
      error_message: action.payload
    }
  case constants.UPDATING_SET_GROUP:
    return{
      ...state,
      crudingSetGroup: 'updating-set-group'
    }
  case constants.UPDATE_SET_GROUP_SUCCESS:
    return{
      ...state,
      currentSetGroup: action.payload,
      currentSetGroups: [
        ...state.currentSetGroups.map(setGroup => setGroup._id === action.payload._id ? action.payload : setGroup)
      ]
    }
  case constants.UPDATE_SET_GROUP_FAIL:
    return{
      ...state,
      crudingSetGroup: false,
      error_message: action.payload
    }
  case constants.UPDATING_MANY_SET_GROUPS:
    return{
      ...state,
      crudingSetGroup: 'updating-many-set-groups'
    }
  case constants.UPDATE_MANY_SET_GROUPS_SUCCESS:
    return{
      ...state,
      crudingSetGroup: false
    }
  case constants.UPDATE_MANY_SET_GROUPS_FAIL:
    return{
      ...state,
      crudingSetGroup: false,
      error_message: action.payload
    }
  case constants.DELETING_SET_GROUP:
    return{
      ...state,
      crudingSetGroup: 'deleting-set-group'
    }
  case constants.DELETE_SET_GROUP_FAIL:
    return{
      ...state,
      crudingSetGroup: false,
      error_message: action.payload
    }
  case constants.DELETE_SET_GROUP_SUCCESS:
    const setGroupId = action.payload._id ? action.payload._id : action.payload
    return{
      ...state,
      crudingSetGroup: false,
      currentSetGroups: [
        ...state.currentSetGroups
        .filter(setGroup => setGroup._id !== setGroupId)
      ]
    }
  

  // interdependant actions
  case constants.FETCHING_FLATTENED_ROUTINE:
    return{
      ...state,
      crudingSetGroup: 'fetching-set-groups'
    }
  case constants.FETCH_FLATTENED_ROUTINE_SUCCESS:
    return{
      ...state,
      crudingSetGroup: false,
      currentSetGroups: action.payload.set_groups
    }
  case constants.FETCH_FLATTENED_ROUTINE_FAIL:
    return{
      ...state,
      crudingSetGroup: false,
      error_message: action.payload
    }
  case constants.DELETE_WEEK_SUCCESS:
    const weekId = action.payload._id ? action.payload._id : action.payload
    return{
      ...state,
      currentSetGroups: [
        ...state.currentSetGroups
        .filter(setGroup => setGroup.week !== weekId)
      ]
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