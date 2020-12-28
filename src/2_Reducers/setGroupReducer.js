import * as constants from '../1_Actions'


 const setGroupTypes = [
  "Straight",
  "Super",
  "Super - Antagonist", 
  "Super - Compound", 
  "Super - Tri", 
  "Super - Giant", 
  "Circuit", 
  "Pyramid",
  "Drop",
  "Stripping",
  "Rest - Pause",
  "Pre-Exhaustion"]



const initialState = {
  set_group_types: setGroupTypes,
  currentSetGroup: {
    routine: null, //required
    week: null, //required
    user: null, //required
    week_number: null, //required
    day_number: null, //required
    day: null,
    set_group_type: null,
    name: null,
    scheduled_time: null,
    completed_time: null,
    order: null,
    target_sets: null,
    actual_sets: null
  }
  
}

const reducer = (state=initialState, action) => {
  switch(action.type){

  case  constants.WRITING_SET_GROUP: 
    return{
      ...state,
      [action.payload.key]: action.payload.value
    }
  
  case constants.SET_CURRENT_SET_GROUP:
    return{
      ...state,
      currentSetGroup: action.payload
    }

  case constants.LOG_OUT:
    return initialState

  default: 
    return state

  }
}

export default reducer