export const routineScheduleConstructor = (currentSetGroups, currentWeeks, currentSetGroupSets) => {
  
  const dayKey = {
    1: "Su",
    2: "Mo",
    3: "Tu",
    4: "We",
    5: "Th",
    6: "Fr",
    7: "Sa"
  }

  let routineSchedule = {}

  if(currentSetGroups){
  
    currentWeeks.forEach((week, index) => routineSchedule[index + 1] = {
      _id: week._id,
      week_number: index + 1
    })

    const mergedSetsIntoSetGroups =  currentSetGroups.map(set_group => {
      set_group.exercise_sets = currentSetGroupSets.filter(exSet => exSet.set_group === set_group._id)
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

