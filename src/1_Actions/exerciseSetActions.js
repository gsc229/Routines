import * as constants from './index'
import {getExerciseSets, updateExerciseSet, createMultipleExerciseSets, bulkUpdateExerciseSets, deleteExerciseSet} from '../3_APIs/exerciseSetApi'

const generalErrorMessage = "Something went wrong with your request"

export const setCurrentExerciseSet = (exerciseSet) => dispatch => {
  dispatch({type: constants.SET_CURRENT_EXERCISE_SET, payload: exerciseSet})
}

export const localWritingExerciseSet = (key, value) => dispatch => {
  dispatch({type: constants.WRITING_EXERCISE_SET, payload: {key, value}})
}

export const clearCurrentExerciseSet = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_EXERCISE_SET})
}

export const clearCurrentExerciseSets = () => dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_EXERCISE_SETS})
}

export const setCurrentExerciseSets = (sets) => dispatch => {
  dispatch({type: constants.SET_CURRENT_EXERCISE_SETS, payload: sets})
}


export const addToCurrentExerciseSets = (exerciseSet) => dispatch => {
  dispatch({type: constants.ADD_TO_CURRENT_EXERCISE_SETS, payload: exerciseSet})
}

export const removeFromCurrentExerciseSetsByExerciseID = (exerciseId) => dispatch => {
 dispatch({type: constants.REMOVE_FROM_CURRENT_EXERCISE_SETS_BY_EXERCISE_ID, payload: exerciseId})
}

export const removeFromCurrentExerciseSetsBySetID = (setId) => dispatch => {
  dispatch({type: constants.REMOVE_FROM_CURRENT_EXERCISE_SETS_BY_SET_ID, payload: setId})
 }

export const localBulkWriteExerciseSets = (exercisesSetsArray) => dispatch => {
  dispatch({type: constants.LOCAL_BULK_WRITE_CURRENT_EXERCISE_SETS, payload: exercisesSetsArray})
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

export const saveExerciseSetChanges = (exerciseSetId, updates) => dispatch => {
  dispatch({type: constants.UPDATING_EXERCISE_SET})
  return updateExerciseSet(exerciseSetId, updates)
  .then(response => {
    if(response && response.success){
      dispatch({type: constants.UPDATE_EXERCISE_SET_SUCCESS, payload: response.data})
      return true
    } 
    if(response && response.error_message){
      dispatch({type: constants.UPDATE_EXERCISE_SET_FAIL, payload: response.error_message})
      return false
    }
    dispatch({type: constants.UPDATE_EXERCISE_SET_FAIL, payload: generalErrorMessage})
      return false
  })
}

export const bulkWriteExerciseSets = (updatesArray, setGroupId) => dispatch => {
  dispatch({type: constants.BULK_WRITING_EXERCISE_SETS})
  return bulkUpdateExerciseSets(updatesArray, setGroupId)
  .then(response => {
    if(response && response.success){
      dispatch({type: constants.BULK_WRITE_EXERCISE_SETS_SUCCESS})
      return response
    } 
    if(response && response.error_message){
      dispatch({type: constants.BULK_WRITE_EXERCISE_SETS_FAIL, payload: response.error_message})
      return false
    }
    dispatch({type: constants.BULK_WRITE_EXERCISE_SETS_FAIL, payload: generalErrorMessage})
      return false
  })
}

export const createNewExerciseSets = (newSetsArray) => dispatch => {
  // required on each new set in the array are user, routine, set_group, and week ids 
  if(newSetsArray.length === 0){
    dispatch({type: constants.CREATE_EXERCISE_SETS_FAIL, payload: "New sets array is empty"})
      return false
  }

  dispatch({type: constants.CREATING_EXERCISE_SETS})
  return createMultipleExerciseSets(newSetsArray)
  .then(createNewExerciseSetsResponse => {
    if(createNewExerciseSetsResponse.success){
      dispatch({type: constants.CREATE_EXERCISE_SETS_SUCCESS, payload: createNewExerciseSetsResponse.data})
      return createNewExerciseSetsResponse
    }
    if(createNewExerciseSetsResponse.error_message){
      dispatch({type: constants.CREATE_EXERCISE_SETS_FAIL, payload: createNewExerciseSetsResponse.error_message})
      return false
    }
    dispatch({type: constants.CREATE_EXERCISE_SETS_FAIL, payload: generalErrorMessage})
      return false
  })
}

export const destroyExerciseSet = (setId) => dispatch => {
  dispatch({type: constants.DELETING_EXERCISE_SET})
  return deleteExerciseSet(setId)
  .then(deleteExSetResponse => {
    if(deleteExSetResponse.success){
      dispatch({type: constants.DELETE_EXERCISE_SET_SUCCESS, payload: setId})
      return deleteExSetResponse
    }
    if(deleteExSetResponse.error_message){
      dispatch({type: constants.DELETE_EXERCISE_SET_FAIL, payload: deleteExSetResponse.error_message})
      return false
    }
    dispatch({type: constants.DELETE_EXERCISE_SET_FAIL, payload: generalErrorMessage})
      return false
  })
}