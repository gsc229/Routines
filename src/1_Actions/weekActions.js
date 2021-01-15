import * as constants from '.'
import {createWeek, getWeeks, updateWeek, deleteWeek } from '../3_APIs/routineWeekApi'
const generalErrorMessage = "Something went wrong with the request."


export const setCurrentWeek = (week) => dispatch => {
  dispatch({type: constants.SET_CURRENT_WEEK, payload: week})
}

export const clearCurrentWeek = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_WEEK})
}

export const setScheduleDnDSelectedWeekNumber = (number) => dispatch => {
  dispatch({type: constants.SET_SELECTED_WEEK_NUMBER, payload: number})
}


/* ASYNC */
export const weeksQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_WEEKS})
  return getWeeks(queryString)
  .then(res=>{
    if(res.success){
      dispatch({type: constants.FETCH_WEEKS_SUCCESS, payload: {data: res.data, weeksPagination: res.weeksPagination}})
      return true
    }
    if(res.error_message){
      dispatch({type: constants.FETCH_WEEKS_FAIL, payload: res.error_message})
      return false
    } else {
      dispatch({type: constants.FETCH_WEEKS_FAIL, payload: res.error_message})
      return false
    }
  })

}


// actions handled in routinesReducer
export const createNewWeek = (newWeek) => dispatch => {
  dispatch({type: constants.CREATING_WEEK})
  return createWeek(newWeek)
  .then(response => {
    if(response && response.success){
     dispatch({type: constants.CREATE_WEEK_SUCCESS, payload: response.data})
     return true
    } 
    if(response && response.error_message){
      dispatch({type: constants.CREATE_WEEK_FAIL, payload: response.error_message})
      return false
    } 

    dispatch({type: constants.CREATE_WEEK_FAIL, payload: generalErrorMessage})
    return false
  })
}

export const saveWeekChanges = (weekId, updates) => dispatch => {
  dispatch({type: constants.UPDATING_WEEK})
  return updateWeek(weekId, updates)
  .then(response => {
    if(response && response.success){
    dispatch({type: constants.UPDATE_WEEK_SUCCESS, payload: response.data})
    return response
    } 
    if(response && response.error_message){
      dispatch({type: constants.UPDATE_WEEK_FAIL, payload: response.error_message})
      return false
    } 
    dispatch({type: constants.UPDATE_WEEK_FAIL, payload: generalErrorMessage})
    return false
  })

}

// actions handled in routinesReducer
export const destroyWeek = (weekId) => dispatch => {
  dispatch({type: constants.DELETING_WEEK})
  return deleteWeek(weekId)
  .then(response => {
    if(response && response.success){
    const payload = response.data._id ? response.data : weekId
    dispatch({type: constants.DELETE_WEEK_SUCCESS, payload})
    return response
    } 
    if(response && response.error_message){
      dispatch({type: constants.DELETE_WEEK_FAIL, payload: response.error_message})
      return false
    } 
    dispatch({type: constants.DELETE_WEEK_FAIL, payload: generalErrorMessage})
      return false
  })

}