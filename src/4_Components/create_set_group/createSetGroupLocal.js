export const createSetGroupLocal = (
  currentSetGroup, 
  createSetGroupData, 
  currentExerciseSet
) => {

  // ensure the correct data type
  for(const key in createSetGroupData) {

    if(createSetGroupData[key]){
      try{
        createSetGroupData[key] = JSON.parse(createSetGroupData[key])
      }catch(error){
        console.log({error})
        continue
      }

    }

  }
  const exerciseSets = []
  
  const {
    is_compound,
    total_sets, 
    rep_max, 
    starting_weight, 
    starting_reps,
    starting_time,
    starting_distance,
    starting_laps,
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
    rest_time_increase,
    laps_decrease,
    laps_increase
  } = createSetGroupData



  // increments and decrements
  let percentWeightDecrease = percent_weight_decrease &&  percent_weight_decrease/100
  let percentWeightIncrease = percent_weight_increase && percent_weight_increase/100
  let percentTimeDecrease = percent_time_decrease && percent_time_decrease/100
  let percentTimeIncrease = percent_time_increase && percent_time_increase/100
  let percentDistanceDecrease = percent_distance_decrease && percent_distance_decrease/100
  let percentDistanceIncrease = percent_distance_increase && percent_distance_increase/100
  let weightDecrease = weight_decrease && weight_decrease
  let weightIncrease = weight_increase && weight_increase
  let timeDecrease = time_decrease && time_decrease
  let timeIncrease = time_increase && time_increase
  let distanceDecrease = distance_decrease && distance_decrease
  let distanceIncrease = distance_increase && distance_increase
  let repsDecrease = reps_decrease && reps_decrease
  let repsIncrease = reps_increase && reps_increase
  let restTimeDecrease = rest_time_decrease && rest_time_decrease
  let restTimeIncrease = rest_time_increase && rest_time_increase
  let lapsDecrease = laps_decrease && laps_decrease
  let lapsIncrease = laps_increase && laps_increase

  // these will change with each iteration below
  let previousWeight = starting_weight && starting_weight
  let previousTime = starting_time && starting_time
  let previousDistance = starting_distance && starting_distance
  let previousReps = starting_reps && starting_reps
  let previousRestTime = rest_time && rest_time
  let previousLaps = starting_laps && starting_laps
   
    for(let i = 0; i < total_sets; i ++){
      let newSet = {...currentExerciseSet}
      // ensure all the ids of the parent objects
      newSet.set_group = currentSetGroup._id
      newSet.user = currentSetGroup.user
      newSet.routine = currentSetGroup.routine
      newSet.week = currentSetGroup.week
      
      // set targets
      newSet.target_weight = previousWeight
      newSet.target_reps = previousReps
      newSet.rest_time = previousRestTime
      newSet.target_distance = previousDistance
      newSet.target_time = previousTime
      newSet.target_laps = previousLaps


      // increment or decrement for each iteration
      previousWeight = Math.round(previousWeight - (previousWeight * percentWeightDecrease))
      previousWeight = Math.round(previousWeight + (previousWeight * percentWeightIncrease))
      previousWeight = Math.round(previousWeight - weightDecrease)
      previousWeight = Math.round(previousWeight + weightIncrease)

      previousTime = Math.round(previousTime - (previousTime * percentTimeDecrease))
      previousTime = Math.round(previousTime + (previousTime * percentTimeIncrease))
      previousTime = Math.round(previousTime - timeDecrease)
      previousTime = Math.round(previousTime + timeIncrease)

      previousDistance = Math.round(previousDistance - (previousDistance * percentDistanceDecrease))
      previousDistance = Math.round(previousDistance + (previousDistance * percentDistanceIncrease))
      previousDistance = Math.round(previousDistance - distanceDecrease)
      previousDistance = Math.round(previousDistance + distanceIncrease)

      previousRestTime = Math.round(previousRestTime - restTimeDecrease)
      previousRestTime = Math.round(previousRestTime + restTimeIncrease)

      previousReps = Math.round(previousReps - repsDecrease)
      previousReps = Math.round(previousReps + repsIncrease)

      previousLaps = Math.round(previousLaps - lapsDecrease)
      previousLaps = Math.round(previousLaps + lapsIncrease)

      exerciseSets.push(newSet)
    }
  
  
  return exerciseSets
}