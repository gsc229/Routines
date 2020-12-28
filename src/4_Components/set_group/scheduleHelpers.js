import {updateSetGroup} from '../../3_APIs/setGroupApi'
import {fetchRoutineById} from '../../1_Actions/routineActions'

export const onSetGroupDragEnd = async (result, routineSchedule, setRoutineSchedule) => {


  console.log({result})
  console.log({routineSchedule})
  

  const {destination, source} = result
  console.log("DESTINATION INDEX: ", destination.index, "SOURCE INDEX: ", source.index)
  const destinationCodes = destination.droppableId.split("-")
  const sourceCodes = source.droppableId.split("-")
  let destinationWeek
  let destinationDay
  let destinationWeekId
  let destinationDayName
  [destinationWeek, destinationDay, destinationWeekId, destinationDayName] = destinationCodes
  let sourceWeek
  let sourceDay
  let sourceWeekId
  let sourceDayName
  [sourceWeek, sourceDay, sourceWeekId, sourceDayName] = sourceCodes


  console.log({destinationCodes, sourceCodes})
  console.log({destinationWeek, destinationDay, destinationWeekId})
  console.log({sourceWeek, sourceDay, sourceWeekId})

  if(!destination) return

  if(destination.droppableId === source.droppableId && destination.index === source.index) return

  if(sourceWeek !== destinationWeek){
  const locatedSource = routineSchedule[sourceWeek][sourceDay]
  const locatedDestination = routineSchedule[destinationWeek][destinationDay]
  const sourceItems = [...locatedSource.set_groups]
  const destinationItems = [...locatedDestination.set_groups]
  const [removed] = sourceItems.splice(source.index, 1)
  removed.week_number = destinationWeek
  removed.day_number = destinationDay
  removed.order = destination.index
  removed.week = destinationWeekId
  removed.day = destinationDayName
  destinationItems.splice(destination.index, 0, removed)

  const updateBackend = await updateSetGroup(removed._id, removed)

  if(updateBackend.success){
      console.log("SUCCESS: ",{updateBackend})
     setRoutineSchedule({
        ...routineSchedule,
        [sourceWeek]: {
          ...routineSchedule[sourceWeek],
          [sourceDay]: {
          ...routineSchedule[sourceWeek][sourceDay],
          set_groups: sourceItems
        }
        },
        [destinationWeek]: {
          ...routineSchedule[destinationWeek],
          [destinationDay]: {
            ...routineSchedule[destinationWeek][destinationDay],
            set_groups: destinationItems
          }
          
        }
      })
      console.log("NEW SCHEDULE SET")
      return 
      
  } else{
    console.log("ERROR UPDATING SCHEDULE",{updateBackend})
    return 
  }
} else if(sourceWeek === destinationWeek && (sourceDay !== destinationDay)){


  const sameWeekSourceLocation = routineSchedule[sourceWeek][sourceDay]
  const sameWeekDesitnationLocation = routineSchedule[destinationWeek][destinationDay]
  const copyOfSourceDaySetGroups = [...sameWeekSourceLocation.set_groups]

  console.log({sameWeekDesitnationLocation, sameWeekSourceLocation})
  console.log("BEFORE: ",{copyOfSourceDaySetGroups})

  const copyOfDestinationDaySetGroups = [...sameWeekDesitnationLocation.set_groups]
  const [removed] = copyOfSourceDaySetGroups.splice(source.index, 1)

  console.log("AFTER: ", copyOfSourceDaySetGroups)
  console.log({removed})

  removed.day_number = destinationDay
  removed.order = destination.index
  removed.week = destinationWeekId
  removed.day = destinationDayName

  copyOfDestinationDaySetGroups.splice(destination.index, 0, removed)
  console.log({copyOfDestinationDaySetGroups})

  const updateBackend = await updateSetGroup(removed._id, removed)
  

  if(updateBackend.success){
    setRoutineSchedule({
      ...routineSchedule,
      [destinationWeek]:{
        ...routineSchedule[destinationWeek],
        [destinationDay]:{
          ...routineSchedule[destinationWeek][destinationDay],
            set_groups: copyOfDestinationDaySetGroups
        },
        [sourceDay]:{
          ...routineSchedule[destinationWeek][sourceDay],
            set_groups: copyOfSourceDaySetGroups
        }
      }
    })
  } else{
    //To Do: handle the case where a routine order is changed within the same day
  }
}

}













