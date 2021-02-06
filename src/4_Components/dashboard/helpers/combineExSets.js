export const combineExSets = (userRoutines) => {

  const combinedExSets = []
  userRoutines.forEach(routine => combinedExSets.push(...routine.exercise_sets))
  return combinedExSets

}