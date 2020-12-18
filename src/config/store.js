import {createStore, applyMiddleware} from 'redux'
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

const store = createStore(reducer, persistedState, applyMiddleware(thunk, logger))

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
