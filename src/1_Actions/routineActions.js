import {getRoutines, getWeeks} from '../3_APIs/routinesApi'
import {FETCHING_USER_ROUTINES, FETCH_USER_ROUTINES_SUCCESS, FETCH_USER_ROUTINES_FAIL, FETCHING_WEEKS, FETCH_WEEKS_SUCCESS, FETCH_WEEKS_FAIL, FETCHING_ROUTINE_EXERCISES, FETCH_ROUTINE_EXERCISES_SUCCESS, FETCH_ROUTINE_EXERCISES_FAIL, FETCHING_EXERCISES, FETCH_EXERCISES_SUCCESS, FETCH_EXERCISES_FAIL} from './index'


export const userRoutinesQuery = (queryString) => dispatch => {
  dispatch({type: FETCHING_USER_ROUTINES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      console.log({res})
      return dispatch({type: FETCH_USER_ROUTINES_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
  })
}

export const userWeeksQuery = (queryString) => dispatch => {
  dispatch({type: FETCHING_WEEKS})
  getWeeks(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: FETCH_WEEKS_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: FETCH_WEEKS_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_WEEKS_FAIL, payload: res.error_message})
  })

}

export const userRoutineExercisesQuery= (queryString) => dispatch => {
  dispatch({type: FETCHING_ROUTINE_EXERCISES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: FETCH_ROUTINE_EXERCISES_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: FETCH_ROUTINE_EXERCISES_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_ROUTINE_EXERCISES_FAIL, payload: res.error_message})
  })

}

export const userExercisesQuery = (queryString) => dispatch => {
  dispatch({type: FETCHING_EXERCISES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: FETCH_EXERCISES_SUCCESS, payload: {data: res.data, pagination: res.pagination}})
    } else if(res.error_message){
      return dispatch({type: FETCH_EXERCISES_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_EXERCISES_FAIL, payload: res.error_message})
  })

}