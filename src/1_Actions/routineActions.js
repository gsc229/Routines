import * as constants from '../1_Actions'
import {updateRoutine, createRoutine, getRoutines} from '../3_APIs/routinesApi'

const generalErrorMessage = "Something went wrong with the request."

export const writingRoutine = (field, data) => dispatch => {
  dispatch({type: constants.WRITING_ROUTINE, payload: {field, data}})
}

export const clearCurrentRoutine = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_ROUTINE})
}

export const userRoutinesQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_ROUTINES})
  return getRoutines(queryString)
  .then(res=>{
    if(res.success){
      dispatch({type: constants.FETCH_ROUTINES_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
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

export const editRoutine = (updates) => dispatch => {
  dispatch({type: constants.UPDATING_ROUTINE})
  return updateRoutine(updates)
  .then(response => {
    if(response.success){
     dispatch({type: constants.UPDATE_ROUTINE_SUCCESS})
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

