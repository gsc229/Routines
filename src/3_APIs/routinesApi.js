import axiosWihAuth from '../utils/axiosWithAuth'

export const getRoutines = (querString) => {
  return axiosWihAuth()
  .get(`/routines?${querString}`)
  .then(routinesResponse=>{
    console.log({routinesResponse})
    return routinesResponse.data
  })
  .catch(routinesError => {
    console.log({routinesError})
    if(routinesError.response){
      return routinesError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const createRoutine = (newRoutine) => {
  return axiosWihAuth()
  .post(`/routines`, newRoutine)
  .then(routinesResponse=>{
    console.log({routinesResponse})
    return routinesResponse.data
  })
  .catch(routinesError => {
    console.log({routinesError})
    console.log("error.response: ", routinesError.response)
    if(routinesError.response){
      return routinesError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const updateRoutine = (routineId, updates) => {
  
  return axiosWihAuth()
  .put(`/routines/routine/${routineId}`, updates)
  .then(routinesResponse=>{
    console.log({routinesResponse})
    return routinesResponse.data
  })
  .catch(routinesError => {
    console.log({routinesError})
    if(routinesError.response){
      return routinesError.response.data
    }
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}


