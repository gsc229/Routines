import {combineReducers} from 'redux'
import exerciseReducer from './exerciseReducer'
import routineReducer from './routineReducer'
import weekReducer from './weekReducer'
import setGroupReducer from './setGroupReducer'
import exerciseSetReducer from './exerciseSetReducer'
import userReducer from './userReducer'

export default combineReducers({
  exerciseReducer, 
  routineReducer, 
  weekReducer, 
  setGroupReducer, 
  exerciseSetReducer, 
  userReducer
})