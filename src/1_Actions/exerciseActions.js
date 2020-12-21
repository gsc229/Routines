import * as constants from '../1_Actions'

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