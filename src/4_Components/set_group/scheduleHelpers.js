import {updateSetGroup} from '../../3_APIs/setGroupApi'

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
  // To Do:
  // Do the async stuff
  // remove the set_group from the array in the source location
  // add the set_group to the array in the destication location
  // spread into new state
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
      return 
      console.log("NEW SCHEDULE SET")
  } else{
    console.log("ERROR UPDATING SCHEDULE",{updateBackend})
    return 
  }
} else if(sourceWeek === destinationWeek && (sourceDay !== destinationDay)){
  const sameWeekSource = routineSchedule[sourceWeek][sourceDay]
  const sameWeekDesitnation = routineSchedule[destinationWeek][destinationDay]
  const copyOfSourceDayItems = [...sameWeekSource.set_groups]
  console.log("BEFORE: ",{copyOfSourceDayItems})
  const copyOfDestinationDayItems = [...sameWeekDesitnation.set_groups]
  const [removed] = copyOfSourceDayItems.splice(source.index, 1)
  console.log("AFTER: ", copyOfSourceDayItems)
  removed.day_number = destinationDay
  removed.order = destination.index
  removed.week = destinationWeekId
  removed.day = destinationDayName
  copyOfDestinationDayItems.splice(destination.index, removed, 0)

  const updateBackend = await updateSetGroup(removed._id, removed)
  if(updateBackend.success){
    setRoutineSchedule({
      ...routineSchedule,
      [destinationWeek]:{
        ...routineSchedule[destinationWeek],
        [destinationDay]:{
          ...routineSchedule[destinationWeek][destinationDay],
            set_groups: copyOfDestinationDayItems
        },
        [sourceDay]:{
          ...routineSchedule[destinationWeek][sourceDay],
            set_groups: copyOfSourceDayItems
        }
          
        
        
      }
    })
  } else{

  }
}

/* else{
  // Move the item to the new index in the array
  const movedWithinWeekSetGroup = routineSchedule[sourceWeek][sourceDay]
  const copiedItems = [...movedWithinWeekSetGroup.set_groups]
  const [removed] = copiedItems.splice(source.index, 1)
  copiedItems.splice(destination.index, 0, removed)
  setWeekDays({
    ...weekDays,
    [source.droppableId]: {
      ...column,
      set_groups: copiedItems
    }
  })
} */








}







/* 
if(source.droppableId !== destination.droppableId){
  // Move the item from the source to the destination in the proper place in the destination
  // set_groups array --- dropabableIds are 'U', 'M', 'T', 'W', 'R', 'F'
  const sourceDay = weekDays[source.droppableId] 
  const destinationDay = weekDays[destination.droppableId]
  const sourceItems = [...sourceDay.set_groups]
  const destinationItems = [...destinationDay.set_groups]
  let [removed] = sourceItems.splice(source.index, 1)

  removed.day = destination.droppableId
  destinationItems.splice(destination.index, 0, removed)
  setRoutineSchedule({
    ...weekDays,
    [source.droppableId]: {
      ...sourceDay,
      set_groups: sourceItems
    },
    [destination.droppableId]: {
      ...destinationDay,
      set_groups: destinationItems
    }
  })
  
  updateSetGroup(removed._id, {day: removed.day})
  .then(response => {
    if(!response.success){
      // if api call fails, take the item back out of the destination and put back in the source
      alert(`Sorry there was a problem with the server. We couldn't save your changes at this time.\nerror_message: ${response.error_message}`)
     
      // ↓↓↓↓↓↓↓ reverse the logic from above reset local state ↓↓↓↓↓↓↓
      
      const [removed] = destinationItems.splice(destination.index, 1)
      removed.day = source.droppableId
      sourceItems.splice(source.index, 0, removed)
       setRoutineSchedule({
        ...weekDays,
        [source.droppableId]:{
          ...sourceDay,
          set_groups: sourceItems
        },
        [destination.droppableId]:{
          ...destinationDay,
          set_groups: destinationItems
        }
      })
    }
  })
  
} else{
  // Move the item to the new index in the array
  const column = weekDays[source.droppableId]
  const copiedItems = [...column.set_groups]
  const [removed] = copiedItems.splice(source.index, 1)
  copiedItems.splice(destination.index, 0, removed)
  setRoutineSchedule({
    ...weekDays,
    [source.droppableId]: {
      ...column,
      set_groups: copiedItems
    }
  })
}



*/











