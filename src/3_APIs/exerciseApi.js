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
