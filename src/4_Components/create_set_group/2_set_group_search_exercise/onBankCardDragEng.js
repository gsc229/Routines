export const onBankCardDragEnd = (result, bulkWriteChosenExercises, chosenExercises) => {

  const {destination, source} = result

  const cardToMove = chosenExercises[source.index]
  const copy = [...chosenExercises]
  
  copy.splice(source.index, 1)
  
  copy.splice(destination.index, 0, cardToMove)

  bulkWriteChosenExercises(copy)
}