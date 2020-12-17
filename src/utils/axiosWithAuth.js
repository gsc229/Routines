import axios from 'axios'
import {routinesBaseUrl} from '../config/config'
const jwt = JSON.parse(localStorage.getItem('jtw'))

const axiosWithAuth = () =>  {
  console.log({routinesBaseUrl})
  return axios.create({
  baseURL: routinesBaseUrl,
  headers: {
    Authorization: jwt ? `Bearer ${jwt.token}` : '',    
    Accept: 'application/json'
  },
  responseType: 'json'
  
})}

export default axiosWithAuth