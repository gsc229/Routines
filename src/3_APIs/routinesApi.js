import { ReactReduxContext } from 'react-redux'
import axiosWihAuth from '../utils/axiosWithAuth'

export const getRoutines = (querString) => {
  return axiosWihAuth()
  .get(`/routines${querString}`)
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

export const getFlattenedRoutine = (routineId) => {
  return axiosWihAuth()
  .get(`/routines/flattened-routine/${routineId}`)
  .then(getFlattenedRoutineResponse => {
    console.log({getFlattenedRoutineResponse})
    return getFlattenedRoutineResponse.data
  })
  .catch(getFlattenedRoutineError => {
    console.log({getFlattenedRoutineError})
    if(getFlattenedRoutineError.response){
      return getFlattenedRoutineError.response.data
    }
    return {succes: false, error_message: "Something went wrong. Try again lager"}
  })
}

export const getRoutineById = (routineId,querString) => {
  return axiosWihAuth()
  .get(`/routines/routine/${routineId}${querString}`)
  .then(routinesResponse=>{
    console.log({routineId, querString, routinesResponse})
    return routinesResponse.data
  })
  .catch(routinesError => {
    console.log({routinesError})
    if(routinesError.response){
      return routinesError.response.data
    }
    return {succes: false, error_message: "Something went wrong. Try again lager"}
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
  console.log({routineId, updates})
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

export const deleteRoutine = (routineId) => {
  
  return axiosWihAuth()
  .delete(`/routines/routine/${routineId}`)
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


