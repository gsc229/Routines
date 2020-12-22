export const userExerciseSetsQuery = (queryString) => dispatch => {
  dispatch({type: constants.FETCHING_EXERCISE_SETS})
  getRoutines(queryString)
  .then(res=>{
    if(res.success){
      return dispatch({type: constants.FETCH_EXERCISE_SETS_SUCCESS, payload: {data: res.data, setsPagination: res.setsPagination}})
    } else if(res.error_message){
      return dispatch({type: constants.FETCH_EXERCISE_SETS_FAIL, payload: res.error_message})
    } else return dispatch({type: constants.FETCH_EXERCISE_SETS_FAIL, payload: res.error_message})
  })

}