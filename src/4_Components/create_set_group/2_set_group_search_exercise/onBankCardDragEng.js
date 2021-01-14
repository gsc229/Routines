export const onBankCardDragEnd = async (result, localBulkWriteExerciseSets, currentExerciseSets, mode, bulkSaveExerciseSets) => {

  // each result has a destination index as well a draggable id which is also an exercise _id
  // get the exerciseId by..   draggableId.split("-")[0]
  // find all the exercises witht the same draggable/exercise id and put them into an array
  // if there's only one no problem, move on
  // if more than one first sort the array by the order, look at the destination index of the moved set 
  //    keeping in mid that the array will also have an order which is the same as the source index... that's the same set object.
  // if the destination index is lower than any of the other set order's on the set object then no problem, move on 
  // if the destination index is higher than any of the other sets swap the orders 
  // ex 1. destination index is 5 the other orders are  2, 3, 4 and 6
  //    --> switch out 5's object for 4's object
  // determine the REAL destination index and the REAL source index. 
  

  const {destination, source} = result
  
  if(destination.index === source.index) return

  const cardToMove = {...currentExerciseSets[source.index], order: destination.index}
  const copyOfAllSets = [...currentExerciseSets]
  const updates = []

  copyOfAllSets.splice(source.index, 1)
  
  copyOfAllSets.splice(destination.index, 0, cardToMove)
  
  copyOfAllSets
  .forEach((set, index) => {
    set.order = index
    if(mode=='editing'){
      updates.push({
        updateOne: {
          filter: {_id: set._id},
          update: {order: index}
        }
      })
    }
  })

  localBulkWriteExerciseSets(copyOfAllSets)

  console.log({mode, updates})
  if(mode==='editing'){
    // if it fails revert back to previous order an show an 
    const response = await bulkSaveExerciseSets(updates)
    if(!response.success){
      localBulkWriteExerciseSets(currentExerciseSets)
    }
  }
}