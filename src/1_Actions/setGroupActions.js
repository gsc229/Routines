import * as constants from './index'
import { getSetGroupById, getSetGroups, updateSetGroup } from '../3_APIs/setGroupApi'
const generalErrorMessage = "Something went wrong with the request."

export const setCurrentSetGroup = (setGroup) => dispatch => {
  dispatch({type: constants.SET_CURRENT_SET_GROUP, payload: setGroup})
}

export const writingSetGroup = (key, value) => dispatch => {
  dispatch({type: constants.WRITING_CURRENT_SET_GROUP, payload: {key, value}})
}

export const writingCreateSetGroupData = (key, value) => dispatch => {
  dispatch({type: constants.WRITING_CREATE_SET_GROUP_DATA, payload: {key, value}})
}

export const lockInType = (setGroupType) => dispatch => {
  dispatch({type: constants.LOCK_IN_TYPE, payload: setGroupType})
}

export const addDisplayExercise= (exercise) => dispatch => {
  dispatch({type: constants.ADD_DISPLAY_EXERCISE, payload: exercise})
}

export const removeDisplayExercise = (exerciseId) => dispatch => {
 dispatch({type: constants.REMOVE_DISPLAY_EXERCISE, payload: exerciseId})
}

// Async
export const fetchSetGroups = (query) => dispatch => {
  dispatch({type: constants.FETCHING_SET_GROUPS})
  return getSetGroups(query)
  .then(res => {
    if(res.success){
      dispatch({type: constants.FETCH_SET_GROUPS_SUCCESS, payload: res.data})
      return true
    }
    if(!res.success){
      dispatch({type: constants.FETCH_SET_GROUPS_FAIL, payload: res.error_message})
      return false
    }

    dispatch({type: constants.FETCH_SET_GROUPS_FAIL, payload: generalErrorMessage})
      return false
  })
}

export const fetchSetGroupById = ( setGroupId, query) => dispatch => {
  dispatch({type: constants.FETCHING_SET_GROUP})
  return getSetGroupById(setGroupId, query)
  .then(res => {
    if(res.success){
      dispatch({type: constants.FETCH_SET_GROUP_SUCCESS, payload: res.data})
      return true
    }
    if(!res.success){
      dispatch({type: constants.FETCH_SET_GROUP_FAIL, payload: res.error_message})
      return false
    }

    dispatch({type: constants.FETCH_SET_GROUP_FAIL, payload: generalErrorMessage})
      return false
  })
}

export const saveSetGroupChanges = (setGroupId, updates) => dispatch => {
  dispatch({type: constants.UPDATING_SET_GROUP})
  return updateSetGroup(setGroupId, updates)
  .then(response => {
    if(response.success){
     dispatch({type: constants.UPDATE_SET_GROUP_SUCCESS, payload: response.data})
     return true
    } 
    if(response.error_message){
      dispatch({type: constants.UPDATE_SET_GROUP_FAIL, payload: response.error_message})
      return false
    } 
    
    dispatch({type: constants.UPDATE_SET_GROUP_FAIL, payload: generalErrorMessage})
    return false
  })

}

