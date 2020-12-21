import axiosWihAuth from '../utils/axiosWithAuth'

export const getQuery = (querString) => {
  return axiosWihAuth()
  .get(querString)
  .then(queryResponse=>{
    console.log({queryResponse})
    return queryResponse.data
  })
  .catch(queryError => console.log({queryError}))
}