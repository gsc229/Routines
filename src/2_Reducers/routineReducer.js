import * as constants from '../1_Actions'
import randomColor from 'randomcolor'

const colorize = (routines) => {
  const newRoutineNamesColors = {}
  routines.forEach(routine => {
    newRoutineNamesColors[routine._id] = {}
    newRoutineNamesColors[routine._id].name = routine.name
    routine.color ? newRoutineNamesColors[routine._id].color = routine.color : newRoutineNamesColors[routine._id].color = randomColor()
    newRoutineNamesColors[routine.id].start_date = routine.start_date
  })
  return newRoutineNamesColors
}

const initialState = {
  crudingRoutine: false,
  saveRoutineChangesMode: false,
  unsavedChanges: false,
  error_message: '',
  routinePagination: null,
  routineSearchResults: [],
  userExerciseSets: [],
  userRoutines: [],
  routineNamesColorsStartDates: {},
  currentRoutineName: '', 
  currentRoutine: {
    user: null,
    name: null,
    category: null,
    muscle_group: null,
    target_muscle: null,
    description: null,
    difficulty_scale: null,
    start_date: null,
    end_date: null,
    weeks: []
  }
}

const reducer = (state=initialState, action) => {

  let foundRoutine

  switch(action.type){
    case constants.SET_CURRENT_ROUTINE:
      return{
        ...state,
        currentRoutine: action.payload,
        currentRoutineName: action.payload.name,
        unsavedChanges: false
      }
    case constants.CLEAR_ROUTINE_SEARCH_RESULTS:
      return{
        ...state,
        routineSearchResults: initialState.routineSearchResults
      }
    case  constants.WRITING_ROUTINE:
      return{
        ...state,
        unsavedChanges: true,
        currentRoutine: {
          ...state.currentRoutine,
          [action.payload.field]: action.payload.data
        }
      }
    case constants.CLEAR_CURRENT_ROUTINE:
      return{
        ...state,
        currentRoutine: initialState.currentRoutine,
        currentRoutineName: ''
      }
    case constants.SET_ROUTINE_NAMES_COLORS:
      return{
        ...state,
        routineNamesColorsStartDates: action.payload
      }
    case constants.SET_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingRoutine: false,
        currentRoutine: action.payload.routine
      }
    // Async
    case constants.FETCHING_ROUTINES:
      return {
        ...state,
        crudingRoutine: "fetching-routines"
      }
    case constants.FETCH_ROUTINES_FAIL:
      return {
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.FETCH_ROUTINES_SUCCESS:
      return {
        ...state,
        crudingRoutine: false,
        routineNamesColorsStartDates: colorize(action.payload.data),
        userRoutines: action.payload.data,
        routinePagination: action.payload.routinePagination
      }
    case constants.FETCHING_FLATTENED_ROUTINE:
      return{
        ...state,
        crudingRoutine: 'fetching-routine'
      }
    case constants.FETCH_FLATTENED_ROUTINE_SUCCESS:
      
      foundRoutine = state.userRoutines.find(routine => routine._id === action.payload.routine._id)

      const flattendRoutine = {
        ...action.payload.routine,
        weeks: action.payload.weeks,
        set_groups: action.payload.set_groups,
        exercise_sets: action.payload.exercise_sets
      }

      return{
        ...state,
        crudingRoutine: false,
        currentRoutine: action.payload.routine,
        userRoutines: foundRoutine 
        ? state.userRoutines
        .map(routine => {
          if(routine._id === flattendRoutine._id){
            return flattendRoutine
          } else{
            return routine
          }
        })
        : [...state.userRoutines, flattendRoutine]
      }
    case constants.FETCH_FLATTENED_ROUTINE_FAIL:
      return{
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.FETCHING_ROUTINE:
      return {
        ...state,
        crudingRoutine: "fetching-routine"
      }
    case constants.FETCH_ROUTINE_FAIL:
      return {
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.FETCH_ROUTINE_SUCCESS:
      return {
        ...state,
        crudingRoutine: false,
        currentRoutine: action.payload
      }
    case constants.CREATING_ROUTINE:
      return{
        ...state,
        crudingRoutine: "creating"
      }
    case constants.CREATE_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingRoutine: false,
        currentRoutineIsSaved: true,
        unsavedChanges: false,
        currentRoutine: action.payload,
        currentRoutineName: action.payload.name,
        userRoutines: [...state.userRoutines, action.payload]
      }
    case constants.CREATE_ROUTINE_FAIL:
      return {
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.UPDATING_ROUTINE:
      return{
        ...state,
        crudingRoutine: "updating"
      }
    case constants.UPDATE_ROUTINE_SUCCESS:
      return{
        ...state,
        crudingRoutine: false,
        unsavedChanges: false,
        currentRoutine: action.payload,
        routineNamesColorsStartDates: {
          ...state.routineNamesColorsStartDates,
          [action.payload._id]: {
            name: action.payload.name,
            color: action.payload.color
          }
        },
        currentRoutineName: action.payload.name,
        userRoutines: [...state.userRoutines.map(routine => {
          if( routine._id === action.payload._id){
            console.log('routineReducer: ', {...routine, ...action.payload})
            return {...routine, ...action.payload}
          } else{
            return routine
          }
        })]
      }
    case constants.UPDATE_ROUTINE_FAIL:
      return{
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.DELETING_ROUTINE:
      return{
        ...state,
        crudingRoutine: "deleting-routine"
      }
    case constants.DELETE_ROUTINE_SUCCESS:
      const routineId = action.payload._id ? action.payload._id : action.payload
      return{
        ...state,
        crudingRoutine: false,
        currentRoutine: initialState.currentRoutine,
        userRoutines: [...state.userRoutines.filter(routine => routine._id !== routineId)]
      }
    case constants.DELETE_ROUTINE_FAIL:
      return{
        ...state,
        crudingRoutine: false,
        error_message: action.payload
      }
    case constants.CLEAR_ERROR_MESSAGE: 
    return {
      ...state,
      error_message: ''
    }

    /* ASCYN Interdependent */
    case constants.CREATE_WEEK_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              weeks: [...routine.weeks, action.payload]
              .sort((a, b) => a.week_number - b.week_number)
            }
          } else{
            return routine
          }
        })
      }
    case constants.UPDATE_WEEK_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              weeks: routine.weeks
              .map(week => week._id === action.payload._id ? action.payload : week)
              .sort((a, b) => a.week_number - b.week_number)
            }
          } else{
            return routine
          }
        })
      }
    case constants.BULK_WRITE_WEEKS_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines 
        .map(routine => {
          if(routine._id === action.payload.routineId){
            return{
              ...routine,
              weeks: action.payload.data
            }
          } else{
            return routine
          }
        })
      }
    case constants.DELETE_WEEK_SUCCESS:      
      const deleteSuccessWeekId = action.payload._id ? action.payload._id : action.payload
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              weeks: routine.weeks
              .filter(week => week._id !== deleteSuccessWeekId)
              .sort((a, b) => a.week_number - b.week_number),
              set_groups: routine.set_groups
              .filter(sg => sg.week !== deleteSuccessWeekId),
              exercise_sets: routine.exercise_sets
              .filter(set => set.week !== deleteSuccessWeekId)
            }
          } else{
            return routine
          }
        })
      }
    case constants.CREATE_SET_GROUP_SUCCESS:
      
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              set_groups: [...routine.set_groups, action.payload]
              .sort((a, b) => a.week_number - b.week_number)
            }
          } else{
            return routine
          }
        })
        
      }
    case constants.UPDATE_SET_GROUP_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              set_groups: routine.set_groups 
              .map(setGroup => setGroup._id === action.payload._id ? action.payload : setGroup)
            }
          } else{
            return routine
          }
        })
        
      }
    case constants.BULK_WRITE_SET_GROUPS_SUCCESS:
      const bulkWriteSgsRoutineId = action.payload.data[0].routine
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === bulkWriteSgsRoutineId){
            return{
              ...routine,
              set_groups: action.payload.data
            }
          } else{
            return routine
          }
        })
      }
    case constants.DELETE_SET_GROUP_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              set_groups: routine.set_groups
              .filter(sg => sg._id !== action.payload._id),
              exercise_sets: routine.exercise_sets
              .filter(set => set.set_group !== action.payload._id)
            }
          } else{
            return routine
          }
        })
      }
    case constants.CREATE_EXERCISE_SET_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              exercise_sets: [...routine.exercise_sets, action.payload]
            }
          } else{
            return routine
          }
        })
      }
    case constants.CREATE_EXERCISE_SETS_SUCCESS:
      const createExSetsSuccssRoutineId = action.payload[0] ? action.payload[0].routine : ''
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === createExSetsSuccssRoutineId){
            return{
              ...routine,
              exercise_sets: [...routine.exercise_sets, ...action.payload]
            }
          } else{
            return routine
          }
        })
        
      }
    case constants.UPDATE_EXERCISE_SET_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              exercise_sets: routine.exercise_sets 
              .map(setGroup => setGroup._id === action.payload._id ? action.payload : setGroup)
            }
          } else{
            return routine
          }
        })
        
      }
    case constants.BULK_WRITE_EXERCISE_SETS_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.findByObj.routine){
            return{
              ...routine,
              exercise_sets: action.payload.data
            }
          } else{
            return routine
          }
        })

      }
    case constants.DELETE_EXERCISE_SET_SUCCESS:
      return{
        ...state,
        userRoutines: state.userRoutines
        .map(routine => {
          if(routine._id === action.payload.routine){
            return{
              ...routine,
              exercise_sets: routine.exercise_sets
              .filter(set => set._id !== action.payload._id)
            }
          } else{
            return routine
          }
        })
      }


    case constants.LOG_OUT:
      return {...initialState}

    default: 
      return state

  }
}


export default reducer