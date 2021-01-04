import * as constants from '../1_Actions'
import {updateRoutine, createRoutine, getRoutines, getRoutineById, getFlattenedRoutine} from '../3_APIs/routinesApi'

const generalErrorMessage = "Something went wrong with the request."

export const setCurrentRoutine = (routine) => dispatch => {
  dispatch({type: constants.SET_CURRENT_ROUTINE, payload: routine})
}

export const writingRoutine = (field, data) => dispatch => {
  dispatch({type: constants.WRITING_ROUTINE, payload: {field, data}})
}

export const clearCurrentRoutine = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_ROUTINE})
}

export const clearRoutineSearchResults = () => dispatch => {
  dispatch({type: constants.CLEAR_ROUTINE_SEARCH_RESULTS})
}

// ASYNC 

export const fetchRoutines = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_ROUTINES})
  return getRoutines(queryString)
  .then(res=>{
    if(res.success){
      dispatch({type: constants.FETCH_ROUTINES_SUCCESS, payload: {data: res.data, routinePagination: res.routinePagination}})
      return true
    } 
    if(res.error_message){
      dispatch({type: constants.FETCH_ROUTINES_FAIL, payload: res.error_message})
      return false
    } 
      dispatch({type: constants.FETCH_ROUTINES_FAIL, payload: generalErrorMessage })
      return false

   
  })
}

export const fetchFlattenedRoutine = (routineId) => dispatch => {
  dispatch({type: constants.FETCHING_FLATTENED_ROUTINE})
  return getFlattenedRoutine(routineId)
  .then(response=> {
    if(response.success){
      dispatch({type: constants.FETCH_FLATTENED_ROUTINE_SUCCESS, payload: response.data})
      return response
    } 
    if(response.error_message){
      dispatch({type: constants.FETCH_FLATTENED_ROUTINE_FAIL, payload: response.error_message})
      return false
    } 
      dispatch({type: constants.FETCH_FLATTENED_ROUTINE_FAIL, payload: generalErrorMessage })
      return false
  })
}


export const fetchRoutineById = (routineId, queryString) => dispatch => {
  dispatch({type: constants.FETCHING_ROUTINE})
  return getRoutineById(routineId, queryString)
  .then(res=> {
    if(res.success){
      dispatch({type: constants.FETCH_ROUTINE_SUCCESS, payload: queryString ? res.data[0] : res.data})
      return true
    } 
    if(res.error_message){
      dispatch({type: constants.FETCH_ROUTINE_FAIL, payload: res.error_message})
      return false
    } 
      dispatch({type: constants.FETCH_ROUTINE_FAIL, payload: generalErrorMessage })
      return false
  })
}

export const createNewRoutine = (newRoutine) => dispatch => {
  console.log("routineActoins create new", {newRoutine})
  dispatch({type: constants.CREATING_ROUTINE})
  return createRoutine(newRoutine)
  .then(response => {
    if(response.success){
     dispatch({type: constants.CREATE_ROUTINE_SUCCESS, payload: response.data})
     return true
    } 
    if(response.error_message){
      dispatch({type: constants.CREATE_ROUTINE_FAIL, payload: response.error_message})
      return false
    } 

    dispatch({type: constants.CREATE_ROUTINE_FAIL, payload: generalErrorMessage})
    return false
  })
}

export const saveRoutineChanges = (routineId, updates) => dispatch => {
  dispatch({type: constants.UPDATING_ROUTINE})
  return updateRoutine(routineId, updates)
  .then(response => {
    if(response.success){
     dispatch({type: constants.UPDATE_ROUTINE_SUCCESS, payload: response.data})
     return true
    } 
    if(response.error_message){
      dispatch({type: constants.UPDATE_ROUTINE_FAIL, payload: response.error_message})
      return false
    } 
    
    dispatch({type: constants.UPDATE_ROUTINE_FAIL, payload: generalErrorMessage})
    return false
  })

}

