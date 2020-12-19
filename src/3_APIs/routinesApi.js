import axiosWihAuth from '../utils/axiosWithAuth'

export const getRoutines = (querString) => {
  return axiosWihAuth()
  .get(`/routines?${querString}`)
  .then(routinesResponse=>{
    console.log({routinesResponse})
    return routinesResponse.data
  })
  .catch(routinesError => console.log({routinesError}))
}

export const getWeeks = (querString) => {
  return axiosWihAuth()
  .get(`/routines/weeks?${querString}`)
  .then(routinesWeeksResponse => {
    console.log({routinesWeeksResponse})
    return routinesWeeksResponse.data
  })
  .catch(routinesWeeksError => console.log({routinesWeeksError}))
}