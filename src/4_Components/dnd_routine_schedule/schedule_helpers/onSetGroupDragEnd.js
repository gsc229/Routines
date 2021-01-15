export const onSetGroupDragEnd = async (result, selectedWeek, saveSetGroupChanges, setSelectedWeek) => {

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
  const locatedSource = selectedWeek[sourceWeek][sourceDay]
  const locatedDestination = selectedWeek[destinationWeek][destinationDay]
  const sourceItems = [...locatedSource.set_groups]
  const destinationItems = [...locatedDestination.set_groups]
  const [removed] = sourceItems.splice(source.index, 1)
  removed.week_number = destinationWeek
  removed.day_number = destinationDay
  removed.order = destination.index
  removed.week = destinationWeekId
  removed.day = destinationDayName
  destinationItems.splice(destination.index, 0, removed)

  setSelectedWeek({
      ...selectedWeek,
      [sourceWeek]: {
        ...selectedWeek[sourceWeek],
        [sourceDay]: {
        ...selectedWeek[sourceWeek][sourceDay],
        set_groups: sourceItems
      }
      },
      [destinationWeek]: {
        ...selectedWeek[destinationWeek],
        [destinationDay]: {
          ...selectedWeek[destinationWeek][destinationDay],
          set_groups: destinationItems
        }
        
      }
    })
    

    
  return saveSetGroupChanges(removed._id, removed) 
 
} else if(sourceWeek === destinationWeek && (sourceDay !== destinationDay)){


  const sameWeekSourceLocation = selectedWeek[sourceWeek][sourceDay]
  const sameWeekDesitnationLocation = selectedWeek[destinationWeek][destinationDay]
  const copyOfSourceDaySetGroups = [...sameWeekSourceLocation.set_groups]

  const copyOfDestinationDaySetGroups = [...sameWeekDesitnationLocation.set_groups]
  const [removed] = copyOfSourceDaySetGroups.splice(source.index, 1)

  removed.day_number = destinationDay
  removed.order = destination.index
  removed.week = destinationWeekId
  removed.day = destinationDayName

  copyOfDestinationDaySetGroups.splice(destination.index, 0, removed)
  setSelectedWeek({
    ...selectedWeek,
    [destinationWeek]:{
      ...selectedWeek[destinationWeek],
      [destinationDay]:{
        ...selectedWeek[destinationWeek][destinationDay],
          set_groups: copyOfDestinationDaySetGroups
      },
      [sourceDay]:{
        ...selectedWeek[destinationWeek][sourceDay],
          set_groups: copyOfSourceDaySetGroups
      }
    }
  })

  
  return saveSetGroupChanges(removed._id, removed)
   
} else if(sourceWeek === destinationWeek && sourceDay === destinationDay){
    const sameDaySourceAndDestinationLocation = selectedWeek[sourceWeek][sourceDay]
    const copyOfSetGroups = [...sameDaySourceAndDestinationLocation.set_groups]
    const [removed] = copyOfSetGroups.splice(source.index, 1)
    removed.order = destination.index
    copyOfSetGroups.splice(destination.index, 0, removed)

    setSelectedWeek({
      ...selectedWeek,
      [destinationWeek]:{
        ...selectedWeek[destinationWeek],
        [destinationDay]: {
          ...selectedWeek[destinationWeek][destinationDay],
          set_groups: copyOfSetGroups
        }
      }
    })

    
    return saveSetGroupChanges(removed._id, removed)
  }

}













