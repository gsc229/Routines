import * as constants from '../1_Actions'


const initialState = {
  CRUD_requirements: {
    user: "",
    routine: "",
    week: "",
    set_group: "",
    day: ""
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type){



    default: 
      return state

  }
}

export default reducer