import * as constants from '../1_Actions'
import {getExercises, updateExercise, createExercise} from "../3_APIs/exerciseApi";

const generalErrorMessage = "Something went wrong with the request."

export const userExercisesQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_EXERCISES})
  return getExercises(queryString)
  .then(res=>{
    if(res.success){
      dispatch({type: constants.FETCH_EXERCISES_SUCCESS, payload: {data: res.data, exercisePagination: res.expercisePagination}})
      return true
    } else if(res.error_message){
      dispatch({type: constants.FETCH_EXERCISES_FAIL, payload: res.error_message})
      return false
    } else {
      dispatch({type: constants.FETCH_EXERCISES_FAIL, payload: res.error_message})
      return false
    }
  })

}

export const publicExercisesQuery = (queryString) => dispatch => {
  dispatch({type: constants.SEARCHING_EXERCISES})
  return getExercises(queryString)
  .then(res=>{
    if(res.success){
      dispatch({type: constants.SEARCH_EXERCISES_SUCCESS, payload: {data: res.data, exercisePagination: res.expercisePagination}})
      return true
    } else if(res.error_message){
      dispatch({type: constants.SEARCH_EXERCISES_FAIL, payload: res.error_message})
      return false
    } else {
      dispatch({type: constants.SEARCH_EXERCISES_FAIL, payload: res.error_message})
      return false
    }
  })

}

export const setCurrentExercise = (exercise) => dispatch => {
  dispatch({type: constants.SET_CURRENT_EXERCISE, payload: exercise})
}

export const localWritingExercise = (field, data) => dispatch => {
  dispatch({type: constants.WRITING_EXERCISE, payload: {field, data}})
}

export const clearCurrentExercise = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_EXERCISE})
}

export const clearExerciseSearchResults = () => dispatch => {
  dispatch({type: constants.CLEAR_EXERCISE_SEARCH_RESULTS})
}

export const createNewExercise = (newExercise) => dispatch => {
  console.log("exerciseActoins create new", {newExercise})
  dispatch({type: constants.CREATING_EXERCISE})
  return createExercise(newExercise)
  .then(response => {
    if(response && response.success){
     dispatch({type: constants.CREATE_EXERCISE_SUCCESS, payload: response.data})
     return true
    } 
    if(response && response.error_message){
      dispatch({type: constants.CREATE_EXERCISE_FAIL, payload: response.error_message})
      return false
    } 

    dispatch({type: constants.CREATE_EXERCISE_FAIL, payload: generalErrorMessage})
    return false
  })
}

export const saveExerciseChanges = (exerciseId, updates) => dispatch => {
  dispatch({type: constants.UPDATING_EXERCISE})
  return updateExercise(exerciseId, updates)
  .then(response => {
    if(response && response.success){
     dispatch({type: constants.UPDATE_EXERCISE_SUCCESS, payload: response.data})
     return true
    } 
    if(response && response.error_message){
      dispatch({type: constants.UPDATE_EXERCISE_FAIL, payload: response.error_message})
      return false
    } 
    
    dispatch({type: constants.UPDATE_EXERCISE_FAIL, payload: generalErrorMessage})
    return false
  })

}

export const destroyExercise = (exerciseId) => dispatch => {
  dispatch({type: constants.DELETING_EXERCISE})
  return updateExercise(exerciseId)
  .then(response => {
    if(response && response.success){
     dispatch({type: constants.DELETE_EXERCISE_SUCCESS, payload: response.data})
     return response  
    } 
    if(response && response.error_message){
      dispatch({type: constants.DELETE_EXERCISE_FAIL, payload: response.error_message})
      return response
    } 
    
    dispatch({type: constants.DELETE_EXERCISE_FAIL, payload: generalErrorMessage})
    return response
  })
}