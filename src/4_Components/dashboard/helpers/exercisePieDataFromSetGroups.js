import moment from 'moment'

export const exercisePieDataFromSetGroups = (exSets=[], setGroupIdDate={}, startDateMoment, duration='month', muscleGroupNameAndColorList) => {
 
  const startDate = startDateMoment.clone().startOf(duration)
  const endDate = startDateMoment.clone().endOf(duration)

  const currentExSets = exSets.filter(set => {
    return moment(setGroupIdDate[set.set_group], 'MM-DD-YYYY').isBetween(startDate, endDate, null, '[]')
  })

  // use the exercise _id not the set group _id
  const exerciseIdExSets = {}
  const exerciseIdName = {}
  const exerciseIdColor = {}
  const exerciseNameId = {}
  const exerciseNameMuscleGroupColor = {}
  const exerciseIdExSetCount = {}
  const exerciseNameExSetCount = {}
  const exerciseIdMuscleGroup = {}
  const exerciseMuscleGroupId = {}
  const muscleGroupCount = {}

  currentExSets.forEach(set => {
    // register the exercise
    if(!exerciseIdExSets[set.exercise._id]){
      exerciseIdExSets[set.exercise._id] = []
      exerciseIdName[set.exercise._id] = set.exercise.name
      exerciseNameId[set.exercise.name] = set.exercise._id
      exerciseIdColor[set.exercise._id] = set.exercise.color || null
      exerciseNameMuscleGroupColor[set.exercise.name] = muscleGroupNameAndColorList[set.exercise.muscle_group].color || null
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
    exerciseIdColor,
    exerciseNameId,
    exerciseIdExSetCount,
    exerciseNameExSetCount,
    exerciseNameMuscleGroupColor,
    muscleGroupCount,
    exerciseMuscleGroupId,
    exerciseIdMuscleGroup
  }

}