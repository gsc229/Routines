import axiosWihAuth from '../utils/axiosWithAuth'

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

export const updateManySetGroups = (queryAndChanges) => {
  // queryAndChanges ex. { query: {week: 23dfj22aadf3e}, changes: {week_number: 3} }
  return axiosWihAuth()
  .put('/set-groups/update-many', queryAndChanges)
  .then(updateManySetGroupsResponse => {
    console.log({updateManySetGroupsResponse})
    return updateManySetGroupsResponse.data
  })
  .catch(updateManySetGroupsErrror => { 
    console.log({updateManySetGroupsErrror})
    if(updateManySetGroupsErrror.response){
      return updateManySetGroupsErrror.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const bulkUpdatSetGroups = (updatesArray, findByObj) => {
  console.log({updatesArray, findByObj})
  
  return axiosWihAuth()
  .put(`/set-groups/bulk-write`, {updatesArray, findByObj})
  .then(bulkWritSetGroupsResponse=>{
    console.log({bulkWritSetGroupsResponse})
    return bulkWritSetGroupsResponse.data
  })
  .catch(bulkWritSetGroupsError => {
    console.log({bulkWritSetGroupsError})
    if(bulkWritSetGroupsError.response){
      return bulkWritSetGroupsError.response.data
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
