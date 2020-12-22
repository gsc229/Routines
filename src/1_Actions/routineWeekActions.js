import * as constants from '../1_Actions'
import {getWeeks, createWeek, updateWeek} from '../3_APIs/routinesApi'

/* ====================================== WEEKS ========================================= */
/* ====================================== WEEKS ========================================= */
/* ====================================== WEEKS ========================================= */
/* ====================================== WEEKS ========================================= */
export const userWeeksQuery = (queryString) => dispatch => {
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

export const createNewWeek = (newWeek) => dispatch => {
  dispatch({type: constants.CREATING_WEEK})
  return createWeek(newWeek)
  .then(response => {
    if(response.success){
     dispatch({type: constants.CREATE_WEEK_SUCCESS})
     return true
    } 
    if(response.error_message){
      dispatch({type: constants.CREATE_WEEK_FAIL, payload: response.error_message})
      return false
    } 

    dispatch({type: constants.CREATE_WEEK_FAIL, payload: generalErrorMessage})
    return false
  })
}

export const saveWeekChanges = (updates) => dispatch => {
  dispatch({type: constants.UPDATING_WEEK})
  return updateWeek(updates)
  .then(response => {
    if(response.success){
    dispatch({type: constants.UPDATE_WEEK_SUCCESS})
    return true
    } 
    if(response.error_message){
      dispatch({type: constants.UPDATE_WEEK_FAIL, payload: response.error_message})
      return false
    } 
    dispatch({type: constants.UPDATE_WEEK_FAIL, payload: generalErrorMessage})
    return false
  })

}