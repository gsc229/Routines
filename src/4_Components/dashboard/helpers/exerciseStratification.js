export const combineSetsGroupsFromFlattendRoutines = (userRoutines) => {
  const userSetGroups = []
  userRoutines.forEach(rt => userSetGroups.push(...rt.set_groups))
  return userSetGroups
}

export const combineExSetsFromFlattendRoutines = (userRoutines) => {
  const userExSets = []
  userRoutines.forEach(rt => rt.exercise_sets && userExSets.push(...rt.exercise_sets))
  return userExSets
}

// for pie charts
export const getNonOrdinalExSetDataFromFlattendRotuines = (userRoutines=[{}]) => {
  const userExSets = combineExSetsFromFlattendRoutines(userRoutines)

  // use the exercise _id not the set group _id
  const exerciseIdExSets = {}
  const exerciseIdName = {}
  const exerciseNameId = {}
  const exerciseIdExSetCount = {}
  const exerciseNameExSetCount = {}
  const exerciseIdMuscleGroup = {}
  const exerciseMuscleGroupId = {}
  const muscleGroupCount = {}

  userExSets.forEach(set => {
    // register the exercise
    if(!exerciseIdExSets[set.exercise._id]){
      exerciseIdExSets[set.exercise._id] = []
      exerciseIdName[set.exercise._id] = set.exercise.name
      exerciseNameId[set.exercise.name] = set.exercise._id
    }

    if(set.exercise.muscle_group && !muscleGroupCount[set.exercise.muscle_group]){
      exerciseMuscleGroupId[set.exercise.muscle_group] = set.exercise._id
      exerciseIdMuscleGroup[set.exercise._id] = set.exercise.muscle_group
      muscleGroupCount[set.exercise.muscle_group] = 1

    } else if(set.exercise.muscle_group && muscleGroupCount[set.exercise.muscle_group]){
      muscleGroupCount[set.exercise.muscle_group] = muscleGroupCount[set.exercise.muscle_group] + 1
    }

    exerciseIdExSets[set.exercise._id].push(set)

  })

  for(const idKey in exerciseIdExSets ){
    const length = exerciseIdExSets[idKey].length
    exerciseIdExSetCount[idKey] = length
    exerciseNameExSetCount[exerciseIdName[idKey]] = length
  }

  return{
    exerciseIdExSets,
    exerciseIdName,
    exerciseNameId,
    exerciseIdExSetCount,
    exerciseNameExSetCount,
    muscleGroupCount,
    exerciseMuscleGroupId,
    exerciseIdMuscleGroup
  }

}