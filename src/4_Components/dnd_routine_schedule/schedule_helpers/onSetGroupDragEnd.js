export const onSetGroupDragEnd = async (result, routineSchedule, saveSetGroupChanges, setRoutineSchedule, currentRoutineSets, bulkWriteExerciseSets) => {
  console.log({result})
  const {destination, source} = result
  // no destination
  if(!destination) return
  // dropped back in the same place
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
  console.log({destinationWeek, destinationDay, destinationWeekId, destinationDayName})
  console.log({sourceWeek, sourceDay, sourceWeekId, sourceDayName})

  // the week was changed
  if(sourceWeek !== destinationWeek){
  const locatedSource = routineSchedule[sourceWeek][sourceDay]
  const locatedDestination = routineSchedule[destinationWeek][destinationDay]
  const sourceItems = [...locatedSource.set_groups]
  const destinationItems = [...locatedDestination.set_groups]
  const [removed] = sourceItems.splice(source.index, 1)
  const removedExSetsCopies = []
  removed.exercise_sets.forEach(set => removedExSetsCopies.push({...set, week: destinationWeekId}))
  console.log('removed before: ', {removed})
  removed.week_number = destinationWeek
  removed.day_number = destinationDay
  removed.order = destination.index
  removed.week = destinationWeekId
  removed.day = destinationDayName
  removed.exercise_sets = removedExSetsCopies
  console.log('removed after: ', {removed})
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
  
  
  const setGroupResponse = await saveSetGroupChanges(removed._id, removed) 
  if(!setGroupResponse.success){
    return
  }
  // update the exercise sets on the back end
  const exSetUpdates = removedExSetsCopies.map(set => ({updateOne: { filter: {_id: set._id}, update: {week: set.week}}})) 
  console.log({exSetUpdates}) 
  bulkWriteExerciseSets(exSetUpdates, {routine: removed.routine})

// the week didn't change, but the day did
} else if(sourceWeek === destinationWeek && (sourceDay !== destinationDay)){


  const sameWeekSourceLocation = routineSchedule[sourceWeek][sourceDay]
  const sameWeekDesitnationLocation = routineSchedule[destinationWeek][destinationDay]
  const copyOfSourceDaySetGroups = [...sameWeekSourceLocation.set_groups]

  const copyOfDestinationDaySetGroups = [...sameWeekDesitnationLocation.set_groups]
  const [removed] = copyOfSourceDaySetGroups.splice(source.index, 1)
  removed.week_number = destinationWeek
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
  
  
  
  return saveSetGroupChanges(removed._id, removed)


   // the order of the set group was changed but not the the week or day
} else if(sourceWeek === destinationWeek && sourceDay === destinationDay){
    const sameDaySourceAndDestinationLocation = routineSchedule[sourceWeek][sourceDay]
    const copyOfSetGroups = [...sameDaySourceAndDestinationLocation.set_groups]
    const [removed] = copyOfSetGroups.splice(source.index, 1)
    removed.week_number = destinationWeek
    removed.day_number = destinationDay
    removed.order = destination.index
    removed.week = destinationWeekId
    removed.day = destinationDayName
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

    
    return saveSetGroupChanges(removed._id, removed)
  }

}













