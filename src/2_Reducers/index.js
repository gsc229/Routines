import {combineReducers} from 'redux'
import exerciseReducer from './exerciseReducer'
import routineReducer from './routineReducer'
import setGroupReducer from './setGroupReducer'
import exerciseSetReducer from './exerciseSetReducer'
import userReducer from './userReducer'

export default combineReducers({exerciseReducer, routineReducer, setGroupReducer, exerciseSetReducer, userReducer})