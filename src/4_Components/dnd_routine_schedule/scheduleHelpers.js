import {updateSetGroup} from '../../3_APIs/setGroupApi'

export const onSetGroupDragEnd = async (result, routineSchedule, setRoutineSchedule) => {

  const {destination, source} = result

  if(!destination) return

  if(destination.droppableId === source.droppableId && destination.index === source.index) return

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
    

    updateSetGroup(removed._id, removed)
    return 
 
} else if(sourceWeek === destinationWeek && (sourceDay !== destinationDay)){


  const sameWeekSourceLocation = routineSchedule[sourceWeek][sourceDay]
  const sameWeekDesitnationLocation = routineSchedule[destinationWeek][destinationDay]
  const copyOfSourceDaySetGroups = [...sameWeekSourceLocation.set_groups]

  const copyOfDestinationDaySetGroups = [...sameWeekDesitnationLocation.set_groups]
  const [removed] = copyOfSourceDaySetGroups.splice(source.index, 1)

  removed.day_number = destinationDay
  removed.order = destination.index
  removed.week = destinationWeekId
  removed.day = destinationDayName

  copyOfDestinationDaySetGroups.splice(destination.index, 0, removed)
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

  updateSetGroup(removed._id, removed)
  return
   
} else if(sourceWeek === destinationWeek && sourceDay === destinationDay){
    const sameDaySourceAndDestinationLocation = routineSchedule[sourceWeek][sourceDay]
    const copyOfSetGroups = [...sameDaySourceAndDestinationLocation.set_groups]
    const [removed] = copyOfSetGroups.splice(source.index, 1)
    removed.order = destination.index
    copyOfSetGroups.splice(destination.index, 0, removed)

    setRoutineSchedule({
      ...routineSchedule,
      [destinationWeek]:{
        ...routineSchedule[destinationWeek],
        [destinationDay]: {
          ...routineSchedule[destinationWeek][destinationDay],
          set_groups: copyOfSetGroups
        }
      }
    })

    updateSetGroup(removed._id, removed)
    return
  }

}













