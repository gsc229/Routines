import axiosWithAuth from '../utils/axiosWithAuth'

export const upadateRoutineExercise = (exercise_set_id, updates) => {
    console.log({exercise_set_id, updates })
    return axiosWithAuth()
    .put(`/exercise-sets/${exercise_set_id}`, updates)
    .then(upadateRoutineExerciseResponse => {
      return upadateRoutineExerciseResponse.data
    })
    .catch(upadateRoutineExerciseError => {
      console.log({upadateRoutineExerciseError: upadateRoutineExerciseError.response})
      return upadateRoutineExerciseError.response.data
    })

}


export const getWeek = (weekId, queryStr) => {
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

export const onDragEnd = async (result, columns, setColumns) => {

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
    // items array --- dropabableIds are 'U', 'M', 'T', 'W', 'R', 'F'
    const sourceColumn = columns[source.droppableId] 
    const destinationColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destinationItems = [...destinationColumn.items]
    let [removed] = sourceItems.splice(source.index, 1)

    removed.day = destination.droppableId
    destinationItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems
      }
    })
    
    alert('About to update!')
    upadateRoutineExercise(removed._id, {day: removed.day})
    .then(response => {
      
      alert(`Sorry there was a problem with the server. We couldn't save your changes at this time.\nerror_message: ${response.error_message}`)
      console.log({response})
      if(!response.success){
        // if api call fails, take the item back out of the destination and put back in the source
       
        // ↓↓↓↓↓↓↓ reverse the logic from above reset local state ↓↓↓↓↓↓↓
        
        const [removed] = destinationItems.splice(destination.index, 1)
        removed.day = source.droppableId
        sourceItems.splice(source.index, 0, removed)
         setColumns({
          ...columns,
          [source.droppableId]:{
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]:{
            ...destinationColumn,
            items: destinationItems
          }
        })
      }
    })
    
  } else{
    // Move the item to the new index in the array
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }

}