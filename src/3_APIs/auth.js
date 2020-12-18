import axiosWithAuth from '../utils/axiosWithAuth'


export const signIn = (userInfo) => {
  return axiosWithAuth()
  .post('/auth/login', userInfo)
  .then(respone => {
    console.log({respone})
    localStorage.setItem('user', JSON.stringify(respone.data.data))
    return respone.data
  })
  .catch(signInError => {
    console.log({signInError})
    return signInError.response.data
  })
}