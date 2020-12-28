import * as constants from './index'
import { getSetGroupById, getSetGroups } from '../3_APIs/setGroupApi'
const generalErrorMessage = "Something went wrong with the request."

export const setCurrentSetGroup = (setGroup) => dispatcch => {
  dispatcch({type: constants.SET_CURRENT_SET_GROUP, payload: setGroup})
}

export const writingSetGroup = (field, data) => dispatch => {
  dispatch({type: constants.WRITING_SET_GROUP, payload: {field, data}})
}

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
  return getSetGroupById(setGroupId, qu)
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
  return updateSetGroup(routineId, updates)
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

