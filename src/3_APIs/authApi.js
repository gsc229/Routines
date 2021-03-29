import axiosWithAuth from '../utils/axiosWithAuth'
export const signIn = (userInfo) => {
  return axiosWithAuth()
  .post('/auth/login', userInfo)
  .then(response => {
    console.log({response})
    localStorage.setItem('token', JSON.stringify(response.data.token))
    return response.data
  })
  .catch(signInError => {
    console.log({signInError})
    return signInError.response.data
  })
}


export const registger = (newUserInfo) => {
  return axiosWithAuth()
  .post('/auth/new-user')
  .then(response => {
    console.log({response})
    localStorage.setItem('token', JSON.stringify(response.data.token))
    return response.data
  })
  .catch(registgerError => {
    console.log({registgerError})
    return registgerError.response.data
  })
}