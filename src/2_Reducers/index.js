import {combineReducers} from 'redux'
import exerciseReducer from './exerciseReducer'
import routineReducer from './routineReducer'
import routineWeekReducer from './routineWeekReducer'
import setGroupReducer from './setGroupReducer'
import exerciseSetReducer from './exerciseSetReducer'
import userReducer from './userReducer'

export default combineReducers({
  exerciseReducer, 
  routineReducer, 
  routineWeekReducer, 
  setGroupReducer, 
  exerciseSetReducer, 
  userReducer
})