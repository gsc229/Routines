import axiosWithAuth from '../../../utils/axiosWithAuth'

export const upadateSetGroup = (set_group_id, updates) => {

    return axiosWithAuth()
    .put(`set-groups/${set_group_id}`, updates)
    .then(upadateSetGroupResponse => {
      return upadateSetGroupResponse.data
    })
    .catch(upadateSetGroupError => {
      console.log({upadateSetGroupError})
      return upadateSetGroupError.response.data
    })
}


export const getWeek = (weekId, queryStr) => {
  console.log({weekId, queryStr})
  return axiosWithAuth()
    .get(`/routines/weeks/${weekId}?${queryStr}`)
    .then(res=>{
      console.log({res})
      return res.data
    })
    .catch(err=>{
      console.log('GET ERROR helpers.js getWeek',{err})
      return err
    })
}

export const onSetGroupDragEnd = async (result, weekDays, setWeekDays) => {

  const {destination, source} = result

  if(!destination) return

  if(
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ){
    return
  }

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
    setWeekDays({
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
    
    upadateSetGroup(removed._id, {day: removed.day})
    .then(response => {
      if(!response.success){
        // if api call fails, take the item back out of the destination and put back in the source
        alert(`Sorry there was a problem with the server. We couldn't save your changes at this time.\nerror_message: ${response.error_message}`)
       
        // ↓↓↓↓↓↓↓ reverse the logic from above reset local state ↓↓↓↓↓↓↓
        
        const [removed] = destinationItems.splice(destination.index, 1)
        removed.day = source.droppableId
        sourceItems.splice(source.index, 0, removed)
         setWeekDays({
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
    setWeekDays({
      ...weekDays,
      [source.droppableId]: {
        ...column,
        set_groups: copiedItems
      }
    })
  }

}