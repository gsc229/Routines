import {getRoutines, getWeeks} from '../3_APIs/routinesApi'
import {FETCHING_USER_ROUTINES,FETCH_USER_ROUTINES_SUCCESS, FETCH_USER_ROUTINES_FAIL} from './index'


export const userRoutinesQuery = (queryString) => dispatch => {
  dispatch({FETCHING_USER_ROUTINES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: FETCH_USER_ROUTINES_SUCCESS, payload: res})
    } else if(res.error_message){
      return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
  })

}


export const userWeeksQuery = (queryString) => dispatch => {
  dispatch({FETCHING_USER_ROUTINES})
  getWeeks(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: FETCH_USER_ROUTINES_SUCCESS, payload: res})
    } else if(res.error_message){
      return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
  })

}

export const userRoutineExercisesQuery= (queryString) => dispatch => {
  dispatch({FETCHING_USER_ROUTINES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: FETCH_USER_ROUTINES_SUCCESS, payload: res})
    } else if(res.error_message){
      return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
  })

}

export const userExercisesQuery = (queryString) => dispatch => {
  dispatch({FETCHING_USER_ROUTINES})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: FETCH_USER_ROUTINES_SUCCESS, payload: res})
    } else if(res.error_message){
      return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
    } else return dispatch({type: FETCH_USER_ROUTINES_FAIL, payload: res.error_message})
  })

}