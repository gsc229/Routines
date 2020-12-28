import axiosWihAuth from '../utils/axiosWithAuth'

export const getExerciseSets = (querString) => {
  return axiosWihAuth()
  .get(`/exercise-sets${querString}`)
  .then(exerciseSetResponse=>{
    console.log({exerciseSetResponse})
    return exerciseSetResponse.data
  })
  .catch(exerciseSetError => {
    console.log({exerciseSetError})
    if(exerciseSetError.response){
      return exerciseSetError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const getExerciseSetById = (exerciseSetId, querString) => {
  return axiosWihAuth()
  .get(`/exercise-sets/${exerciseSetId}${querString}`)
  .then(exerciseSetResponse=>{
    console.log({exerciseSetId, querString, exerciseSetResponse})
    return exerciseSetResponse.data
  })
  .catch(exerciseSetError => {
    console.log({exerciseSetError})
    if(exerciseSetError.response){
      return exerciseSetError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const createExerciseSet = (newExerciseSet) => {
  return axiosWihAuth()
  .post(`/exercise-sets`, newExerciseSet)
  .then(exerciseSetResponse=>{
    console.log({exerciseSetResponse})
    return exerciseSetResponse.data
  })
  .catch(exerciseSetError => {
    console.log({exerciseSetError})
    console.log("error.response: ", exerciseSetError.response)
    if(exerciseSetError.response){
      return exerciseSetError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const updateExerciseSet = (exerciseSetId, updates) => {
  
  return axiosWihAuth()
  .put(`/exercise-sets/${exerciseSetId}`, updates)
  .then(exerciseSetResponse=>{
    console.log({exerciseSetResponse})
    return exerciseSetResponse.data
  })
  .catch(exerciseSetError => {
    console.log({exerciseSetError})
    if(exerciseSetError.response){
      return exerciseSetError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const deleteExerciseSet = (exerciseSetId) => {
  return axiosWihAuth()
  .delete(`/exercise-sets/${exerciseSetId}`)
  .then(exerciseSetResponse=>{
    console.log({exerciseSetResponse})
    return exerciseSetResponse.data
  })
  .catch(exerciseSetError => {
    console.log({exerciseSetError})
    if(exerciseSetError.response){
      return exerciseSetError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}