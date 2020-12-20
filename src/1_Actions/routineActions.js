import {getRoutines, getWeeks} from '../3_APIs/routinesApi'
import * as constants from '../1_Actions'


export const writingRoutine = (field, string) => dispatch => {
  dispatch({type: constants.WRITING_ROUTINE, payload: {field, string}})
}

export const userRoutinesQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_USER_ROUTINES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: constants.FETCH_USER_ROUTINES_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: constants.FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
    } else return dispatch({type: constants.FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
  })
}

export const userWeeksQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_WEEKS})
  getWeeks(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: constants.FETCH_WEEKS_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: constants.FETCH_WEEKS_FAIL, payload: res.error_message})
    } else return dispatch({type: constants.FETCH_WEEKS_FAIL, payload: res.error_message})
  })

}

export const userExerciseSetsQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_ROUTINE_EXERCISES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: constants.FETCH_ROUTINE_EXERCISES_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: constants.FETCH_ROUTINE_EXERCISES_FAIL, payload: res.error_message})
    } else return dispatch({type: constants.FETCH_ROUTINE_EXERCISES_FAIL, payload: res.error_message})
  })

}

export const userExercisesQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_EXERCISES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: constants.FETCH_EXERCISES_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: constants.FETCH_EXERCISES_FAIL, payload: res.error_message})
    } else return dispatch({type: constants.FETCH_EXERCISES_FAIL, payload: res.error_message})
  })

}