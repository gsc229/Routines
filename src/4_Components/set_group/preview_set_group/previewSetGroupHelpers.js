export const createSetGroupLocal = (chosenExercises, currentSetGroup, setGroupData, exerciseSetTemplate) => {
  
  const exerciseSets = []
  
  const {
    is_compound,
    total_sets, 
    rep_max, 
    starting_weight, 
    reps_per_set, 
    rest_time,
    percent_weight_decrease,
    percent_weight_increase,
    percent_time_decrease,
    percent_time_increase,
    percent_distance_decrease,
    percent_distance_increase,
    weight_decrease,
    weight_increase,
    time_decrease,
    time_increase,
    distance_decrease,
    distance_increase,
    reps_increase,
    reps_decrease,
    rest_time_decrease,
    rest_time_increase
  } = setGroupData

  let percentWeightDecrease = percent_weight_decrease/100 || 0
  let percentWeightIncrease = percent_weight_increase/100 || 0
  let percentTimeDecrease = percent_time_decrease/100 || 0
  let percentTimeIncrease = percent_time_increase/100 || 0
  let percentDistanceDecrease = percent_distance_decrease/100 || 0
  let percentDistanceIncrease = percent_distance_increase/100 || 0
  let weightDecrease = weight_decrease || 0
  let weightIncrease = weight_increase || 0
  let timeDecrease = time_decrease || 0
  let timeIncrease = time_increase || 0
  let distanceDecrease = distance_decrease || 0
  let distanceIncrease = distance_increase || 0
  let repsDecrease = reps_decrease || 0
  let repsIncrease = reps_increase || 0
  let restTimeDecrease = rest_time_decrease || 0
  let restTimeIncrease = rest_time_increase || 0
  let previousWeight = starting_weight && JSON.parse(starting_weight)
  let previousTime = starting_weight && JSON.parse(starting_weight)
  let previousDistance = rest_time && JSON.parse(rest_time)
  let previousRepsPerSet = reps_per_set && JSON.parse(reps_per_set)
  let previousRestTime = rest_time && JSON.parse(rest_time)
 
  if(!is_compound){
    chosenExercises.map(exercise => {
    for(let i = 0; i < total_sets; i ++){
      let newSet = {...exerciseSetTemplate}
      newSet.set_group = currentSetGroup._id
      newSet.user = currentSetGroup.user
      newSet.routine = currentSetGroup.routine
      newSet.week = currentSetGroup.week
      newSet.exercise = exercise
      newSet.target_weight = previousWeight
      newSet.target_reps = previousRepsPerSet
      newSet.rest_time = previousRestTime



      previousWeight = Math.round(previousWeight - (previousWeight * percentWeightDecrease))
      previousWeight = Math.round(previousWeight - (previousWeight * percentWeightIncrease))
      previousWeight = Math.round(previousWeight - weightDecrease)
      previousWeight = Math.round(previousWeight - weightIncrease)

      previousTime = Math.round(previousTime - (previousTime * percentTimeDecrease))
      previousTime = Math.round(previousTime - (previousTime * percentTimeIncrease))
      previousTime = Math.round(previousTime - timeDecrease)
      previousTime = Math.round(previousTime - timeIncrease)

      previousDistance = Math.round(previousDistance - (previousDistance * percentDistanceDecrease))
      previousDistance = Math.round(previousDistance - (previousDistance * percentDistanceIncrease))
      previousDistance = Math.round(previousDistance - distanceDecrease)
      previousDistance = Math.round(previousDistance - distanceIncrease)

      previousRestTime = Math.round(previousRestTime - restTimeDecrease)
      previousRestTime = Math.round(previousRestTime - restTimeIncrease)

      previousRepsPerSet = Math.round(previousRepsPerSet - repsDecrease)
      previousRepsPerSet = Math.round(previousRepsPerSet - repsIncrease)


      exerciseSets.push(newSet)
    }
  })

  if(is_compound){
    chosenExercises.map(exercise => {
      let newSet = {...exerciseSetTemplate}
      newSet.set_group = currentSetGroup._id
      newSet.user = currentSetGroup.user
      newSet.routine = currentSetGroup.routine
      newSet.week = currentSetGroup.week
      
      newSet.exercise = exercise._id
      newSet.target_weight = previousWeight
      previousWeight = Math.round(previousWeight - (previousWeight * percentWeightDecrease))
      exerciseSets.push(newSet)
      
    })
  }


}
  
  console.log({chosenExercises, currentSetGroup, setGroupData, exerciseSetTemplate})
  console.log({exerciseSets})
  return exerciseSets
}