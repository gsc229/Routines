import { isDemo } from './config'
import moment from 'moment'

let errorMessage = "Sorry! That's not allowed in demo mode."

const actionIsForbidden = (action) => {
    if(isDemo){
      if((action.type.includes('CREATING') || action.type.includes('DELETING') )){
        const actionType = action.type.includes('CREATING') ? 'CREATING' : 'DELETING'
        switch(actionType){
          case 'CREATING':
            errorMessage = "Sorry, you can't create new objects in demo mode."
            return true
          case 'DELETING': 
            errorMessage = "Sorry, you can't delete objects in demo mode."
            return true
        }
      }

      if( action.type === 'LOG_OUT' ){
        errorMessage = "Sorry! You can't log out in demo mode."
        return true
      }

      if(action.payload){
        if(action.payload.field || action.payload.key){
          switch(action.payload.field || action.payload.key){
            case 'name':
              errorMessage = "Sorry! You can't change names in demo mode."
              return true
            case 'video_url':
              errorMessage = "Sorry! You can't change the iframe in demo mode."
              return true
            case 'description':
              errorMessage = "Sorry! You can't change the description in demo mode."
              return true
            case 'target_muscle':
              errorMessage = "Sorry! You can't change the target muscle in demo mode."
              return true
            case 'start_date':
              if(moment(action.payload.data).isBefore(moment().startOf('year'))){
                errorMessage = "Sorry! You can't set the date before the start of this year in demo mode."
                return true
              }
          }
        }
      }
    }
    return false
}

export const demoFilter = store => next => action => {
  if(isDemo && actionIsForbidden(action)){
    alert(errorMessage)
    throw new Error(errorMessage)
  } else{
    return next(action)
  }
}