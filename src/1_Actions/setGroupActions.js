import * as constants from './index'
import { getSetGroupById, getSetGroups, updateSetGroup, updateManySetGroups, createSetGroup, deleteSetGroup } from '../3_APIs/setGroupApi'
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

export const clearCreateSetGroupData = () => dispatch => {
  dispatch({type: constants.CLEAR_CREATE_SET_GROUP_DATA})
}

export const clearCurrentSetGroup = () =>  dispatch => {
  dispatch({type: constants.CLEAR_CURRENT_SET_GROUP})
}

export const clearChosenExercises = () => dispatch => {
  dispatch({type: constants.CLEAR_CHOSEN_EXERCISES})
}

export const fullResetCreateSetGroup = () => dispatch => {
  dispatch({type: constants.CLEAR_CREATE_SET_GROUP_DATA})
  dispatch({type: constants.CLEAR_CHOSEN_EXERCISES})
  dispatch({type: constants.CLEAR_CURRENT_SET_GROUP})
  dispatch({type: constants.CLEAR_CURRENT_EXERCISE_SETS})
  dispatch({type: constants.CLEAR_EXERCISE_SEARCH_RESULTS})
  dispatch({type: constants.CLEAR_CURRENT_WEEK})

}

export const lockInType = (setGroupType) => dispatch => {
  dispatch({type: constants.LOCK_IN_TYPE, payload: setGroupType})
}

export const addChosenExercise = (exercise) => dispatch => {
  dispatch({type: constants.ADD_TO_CHOSEN_EXERCISES, payload: exercise})
}

export const removeChosenExercise = (exerciseId) => dispatch => {
 dispatch({type: constants.REMOVE_FROM_CHOSEN_EXERCISES, payload: exerciseId})
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

export const saveManySetGroupChanges = (queryAndChanges) => dispatch => {
  // {query: {week: 23487deeefaa9}, changes: {week_number: 2}}
  dispatch({type: constants.UPDATING_MANY_SET_GROUPS})
  return updateManySetGroups(queryAndChanges)
  .then(response =>{
    if(response.success){
      dispatch({type: constants.UPDATE_MANY_SET_GROUPS_SUCCESS})
      const queryString = `?week=${queryAndChanges.query.week}`
      dispatch(fetchSetGroups(queryString))
      return response
    }
    if(response.error_message){
      dispatch({type: constants.UPDATE_MANY_SET_GROUPS_FAIL, payload: response.error_message})
      return false
    }
    dispatch({type: constants.UPDATE_MANY_SET_GROUPS_FAIL, payload: generalErrorMessage})
    return false
  })
}

export const createNewSetGroup = (newSetGroup) => dispatch => {
  dispatch({type: constants.CREATING_SET_GROUP})
  return createSetGroup(newSetGroup)
  .then(response=>{
    if(response.success){
      dispatch({type: constants.CREATE_SET_GROUP_SUCCESS, payload: response.data})
      return response
    }
    if(response.error_message){
      dispatch({type: constants.CREATE_SET_GROUP_FAIL, payload: response.error_message})
      return false
    }
    dispatch({type: constants.CREATE_SET_GROUP_FAIL, payload: generalErrorMessage})
      return false

  })
}

export const destroySetGroup = (setGroupId) => dispatch => {
  dispatch({type: constants.DELETING_SET_GROUP})
  deleteSetGroup(setGroupId)
  .then(response => {
    if(response.success){
      const payload = response.data._id ? response.data : setGroupId
      dispatch({type: constants.DELETE_SET_GROUP_SUCCESS, payload})
      return response
    }
    if(response.error_message){
      dispatch({type: constants.DELETE_SET_GROUP_FAIL, payload: response.error_message})
      return false
    }

    dispatch({type: constants.DELETE_SET_GROUP_FAIL, payload: generalErrorMessage})
    return false

  })
}

