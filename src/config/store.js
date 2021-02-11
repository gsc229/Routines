import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { demoFilter } from './demoActionFilter'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../2_Reducers'


function saveToLocalStorage(state){
  try{
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(error){
    console.log({error})
  }
}

function loadFromLocalStorage(){
  try{
    const serializedState = localStorage.getItem('state')
    if(serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch(error){
    console.log({error})
    return undefined
  }
}

const persistedState = loadFromLocalStorage()



const store = createStore(reducer, persistedState, composeWithDevTools(applyMiddleware(thunk, demoFilter, logger)))

// persist data when ready: 
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
