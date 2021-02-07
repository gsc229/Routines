export const combineExSets = (userRoutines) => {

  const combinedExSets = []
  userRoutines.forEach(routine => routine.exercise_sets && combinedExSets.push(...routine.exercise_sets))
  return combinedExSets

}