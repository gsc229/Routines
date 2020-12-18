import {combineReducers} from 'redux'
import exerciseReducer from './exerciseReducer'
import routineReducer from './routineReducer'
import routineExerciseReducer from './routineExerciseReducer'
import userReducer from './userReducer'

export default combineReducers({exerciseReducer, routineReducer, routineExerciseReducer, userReducer})