import axios from 'axios'
import {routinesBaseUrl} from '../config/config'
const token = JSON.parse(localStorage.getItem('token'))

const axiosWithAuth = () =>  {
  console.log({routinesBaseUrl})
  return axios.create({
  baseURL: routinesBaseUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',    
    Accept: 'application/json'
  },
  responseType: 'json'
  
})}

export default axiosWithAuth