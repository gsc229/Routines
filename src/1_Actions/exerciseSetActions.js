import * as constants from './index'
import {getExerciseSets, updateExerciseSet, createMultipleExerciseSets} from '../3_APIs/exerciseSetApi'

const generalErrorMessage = "Something went wrong with your request"

export const setCurrentExerciseSet = (set) => dispatch => {
  dispatch({type: constants.SET_CURRENT_EXERCISE, payload: set})
}

export const writingExerciseSet = (key, value) => dispatch => {
  dispatch({type: constants.WRITING_EXERCISE_SET, payload: {key, value}})
}

export const clearCurrentExerciseSet = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_EXERCISE_SET})
}

export const clearCurrentSetGroupSets = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_SET_GROUP_SETS})
}

export const setCurrentSetGroupSets = (sets) => dispatch => {
  dispatch({type: constants.SET_CURRENT_SET_GROUP_SETS, payload: sets})
}

// async
export const userExerciseSetsQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_EXERCISE_SETS})
  getExerciseSets(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: constants.FETCH_EXERCISE_SETS_SUCCESS, payload: {data: res.data, setsPagination: res.setsPagination}})
    } else if(res.error_message){
      return dispatch({type: constants.FETCH_EXERCISE_SETS_FAIL, payload: res.error_message})
    } else return dispatch({type: constants.FETCH_EXERCISE_SETS_FAIL, payload: res.error_message})
  })

}

export const saveExerciseSetChanges = (exerciseSetId, updates) => dispatch => {
  dispatch({type: constants.UPDATING_EXERCISE_SET})
  return updateExerciseSet(exerciseSetId, updates)
  .then(response => {
    if(response.success){
      dispatch({type: constants.UPDATE_EXERCISE_SET_SUCCESS, payload: response.data})
      return true
    } 
    if(response.error_message){
      dispatch({type: constants.UPDATE_EXERCISE_SET_FAIL, payload: response.error_message})
      return false
    }
    dispatch({type: constants.UPDATE_EXERCISE_SET_FAIL, payload: generalErrorMessage})
      return false
  })
}

export const createNewExerciseSets = (newSetsPackage) => dispatch => {
  // required ids are user, routine, set_group, week
  dispatch({type: constants.CREATING_EXERCISE_SETS})
  return createMultipleExerciseSets(newSetsPackage)
  .then(createNewExerciseSetsResonse => {
    if(createNewExerciseSetsResonse.success){
      dispatch({type: constants.CREATE_EXERCISE_SETS_SUCCESS, payload: createNewExerciseSetsResonse.data})
      return true
    }
    if(createNewExerciseSetsResonse.error_message){
      dispatch({type: constants.CREATE_EXERCISE_SETS_FAIL, payload: createNewExerciseSetsResonse.error_message})
      return false
    }
    dispatch({type: constants.CREATE_EXERCISE_SETS_FAIL, payload: generalErrorMessage})
      return false
  })
}

