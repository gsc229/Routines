import axiosWihAuth from '../utils/axiosWithAuth'

export const getRoutines = (querString) => {
  axiosWihAuth()
  .get(`/routines?${querString}`)
}

export const getWeeks = (querString) => {
  axiosWihAuth()
  .get(`/routines/weeks?${querString}`)
}