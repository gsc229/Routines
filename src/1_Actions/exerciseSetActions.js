import * as constants from './index'
import {getExerciseSets} from '../3_APIs/exerciseSetApi'


export const setCurrentExerciseSet = (set) => dispatch => {
  dispatch({type: constants.SET_CURRENT_EXERCISE, payload: set})
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

