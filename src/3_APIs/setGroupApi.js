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

export const createSetGroupWithSets = async (newSetGroup, newSets=["setOne", "setTwo", "setThree"]) => {  
  let newSetGroupRequests = []
  newSetGroupRequests.push(axiosWihAuth().post(`/set-groups`, newSetGroup))
  newSets.forEach(set => {
    newSetGroupRequests.push(axiosWihAuth().post(`/exercise-sets`, set))
  });
  

  console.log({newSetGroupRequests})
  axios.all(newSetGroupRequests)
  .then(axios.spread((...responses) => {
    console.log({responses})
  }))
  .catch(errors=>{
    console.log({errors})
  })
  return newSetGroupRequests
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
