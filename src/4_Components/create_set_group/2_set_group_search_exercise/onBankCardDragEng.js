export const onBankCardDragEnd = (result, bulkWriteCurrentExerciseSets, currentExerciseSets) => {

  const {destination, source} = result

  if(destination.index === source.index) return
  console.log({result})
  const cardToMove = currentExerciseSets[source.index]
  const copy = [...currentExerciseSets]
  
  copy.splice(source.index, 1)
  
  copy.splice(destination.index, 0, cardToMove)

  bulkWriteCurrentExerciseSets(copy)
}