export const routineScheduleConstructor = (currentSetGroups, currentWeeks, currentRoutineSets) => {
  
  
  const dayKey = {
    1: "Su",
    2: "Mo",
    3: "Tu",
    4: "We",
    5: "Th",
    6: "Fr",
    7: "Sa"
  }

  // needs to be in the form of {1: {1: day object, 2: day object, ... 7: day object, _id, week_number: 1}, 2: {1: day object, ...} }
  let routineSchedule = {}

  if(currentSetGroups){
  
    currentWeeks.forEach((week, index) => {
                
      return routineSchedule[index + 1] = {
        _id: week._id,
        week_number: index + 1
      }
    })

    const mergedSetsIntoSetGroups =  currentSetGroups.map(set_group => {
        
      set_group.exercise_sets = currentRoutineSets.filter(exSet => exSet.set_group === set_group._id)
      return set_group
    }) 

    console.log({routineSchedule, mergedSetsIntoSetGroups})
    Object.keys(routineSchedule).map(key => {
      for(let j = 1; j <= 7; j++ ){
        routineSchedule[key][j] = {
          day_name: dayKey[j],
          day_number: j,
          set_groups: mergedSetsIntoSetGroups
          .filter(setGroup => setGroup.week === routineSchedule[key]._id && setGroup.day_number === j)
        }
      }

    })

    
  
}
  return routineSchedule
}

