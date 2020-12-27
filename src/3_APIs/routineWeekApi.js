import axiosWihAuth from '../utils/axiosWithAuth';

/* =================================== WEEKS ================================================= */
/* =================================== WEEKS ================================================= */
/* =================================== WEEKS ================================================= */

export const createWeek = (newWeek) => {
  console.log(newWeek)
  return axiosWihAuth()
  .post(`/routines/weeks`, newWeek)
  .then(weekResponse=>{
    console.log({weekResponse})
    return weekResponse.data
  })
  .catch(weekError => {
    console.log({weekError})
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const getWeeks = (querString) => {
  return axiosWihAuth()
  .get(`/routines/weeks${querString}`)
  .then(weeksResponse => {
    console.log({weeksResponse})
    return weeksResponse.data
  })
  .catch(routineWeeksError => {
    console.log({routineWeeksError})
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const getWeekById = (weekId, querString) => {
  return axiosWihAuth()
  .get(`/routines/weeks/${weekId}${querString}`)
  .then(weeksResponse => {
    console.log({weeksResponse})
    return weeksResponse.data
  })
  .catch(routineWeeksError => {
    console.log({routineWeeksError})
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const updateWeek= (weekId, updates) => {
  return axiosWihAuth()
  .put(`/routines/weeks/${weekId}`, updates)
  .then(weekResponse=>{
    console.log({weekResponse})
    return weekResponse.data
  })
  .catch(weekError => {
    console.log({weekError})
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}

export const deleteWeek= (weekId) => {
  return axiosWihAuth()
  .delete(`/routines/weeks/${weekId}`)
  .then(weekResponse=>{
    console.log({weekResponse})
    return weekResponse.data
  })
  .catch(weekError => {
    console.log({weekError})
    return {succes: false, error_message: "Somthing went wrong. Try again lager"}
  })
}