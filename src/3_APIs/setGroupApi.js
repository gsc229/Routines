import axiosWihAuth from '../utils/axiosWithAuth'
import axios from 'axios'

export const getSetGroups = (querString) => {
  return axiosWihAuth()
  .get(`/set-groups${querString}`)
  .then(setGroupResponse=>{
    console.log({setGroupResponse})
    return setGroupResponse.data
  })
  .catch(setGroupError => {
    console.log({setGroupError})
    if(setGroupError.response){
      return setGroupError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const getSetGroupById = (setGroupId,querString) => {
  return axiosWihAuth()
  .get(`/set-groups/${setGroupId}${querString}`)
  .then(setGroupResponse=>{
    console.log({setGroupId, querString, setGroupResponse})
    return setGroupResponse.data
  })
  .catch(setGroupError => {
    console.log({setGroupError})
    if(setGroupError.response){
      return setGroupError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const createSetGroup = (newSetGroup) => {
  return axiosWihAuth()
  .post(`/set-groups`, newSetGroup)
  .then(setGroupResponse=>{
    console.log({setGroupResponse})
    return setGroupResponse.data
  })
  .catch(setGroupError => {
    console.log({setGroupError})
    console.log("error.response: ", setGroupError.response)
    if(setGroupError.response){
      return setGroupError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const updateSetGroup = (setGroupId, updates) => {
  
  return axiosWihAuth()
  .put(`/set-groups/${setGroupId}`, updates)
  .then(setGroupResponse=>{
    console.log({setGroupResponse})
    return setGroupResponse.data
  })
  .catch(setGroupError => {
    console.log({setGroupError})
    if(setGroupError.response){
      return setGroupError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const deleteSetGroup = (setGroupId) => {
  
  return axiosWihAuth()
  .delete(`/set-groups/${setGroupId}`)
  .then(setGroupResponse=>{
    console.log({setGroupResponse})
    return setGroupResponse.data
  })
  .catch(setGroupError => {
    console.log({setGroupError})
    if(setGroupError.response){
      return setGroupError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}
