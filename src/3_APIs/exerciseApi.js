import axiosWihAuth from '../utils/axiosWithAuth'

export const getExercises = (querString) => {
  return axiosWihAuth()
  .get(`/exercises?${querString}`)
  .then(exercisesResponse=>{
    console.log({exercisesResponse})
    return exercisesResponse.data
  })
  .catch(exercisesError => {
    console.log({exercisesError})
    if(exercisesError.response){
      return exercisesError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const createExercise = (newExercise) => {
  return axiosWihAuth()
  .post(`/exercises`, newExercise)
  .then(exercisesResponse=>{
    console.log({exercisesResponse})
    return exercisesResponse.data
  })
  .catch(exercisesError => {
    console.log({exercisesError})
    console.log("error.response: ", exercisesError.response)
    if(exercisesError.response){
      return exercisesError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const updateExercise = (exerciseId, updates) => {
  
  return axiosWihAuth()
  .put(`/exercises/${exerciseId}`, updates)
  .then(exercisesResponse=>{
    console.log({exercisesResponse})
    return exercisesResponse.data
  })
  .catch(exercisesError => {
    console.log({exercisesError})
    if(exercisesError.response){
      return exercisesError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const deleteExercise = (exerciseId) => {
  
  return axiosWihAuth()
  .delete(`/exercises/${exerciseId}`)
  .then(deleteExerciseResponse=>{
    console.log({deleteExerciseResponse})
    return deleteExerciseResponse.data
  })
  .catch(deleteExerciseError => {
    console.log({deleteExerciseError})
    if(deleteExerciseError.response){
      return deleteExerciseError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}
