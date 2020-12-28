export const routineScheduleConstructor = (set_groups, weeks) => {
  
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

  if(set_groups){
  
  weeks.forEach(week => routineSchedule[week.week_number] = {
    _id: week._id,
    week_number: week.week_number
  })

  Object.keys(routineSchedule).map(key => {
    for(let j = 1; j <= 7; j++ ){
      routineSchedule[key][j] = {
        day_name: dayKey[j],
        day_number: j,
        set_groups: []
      }
    }
  })

  set_groups.map(set_group => {
    routineSchedule[set_group.week_number][set_group.day_number].set_groups.push(set_group)
  }) 
  
}
  return routineSchedule
}

