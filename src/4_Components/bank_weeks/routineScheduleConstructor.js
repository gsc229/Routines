export const routineScheduleConstructor = (routineSetGroups, weeks) => {
  console.log('weeks.length: ', weeks.length)
  console.log("weekConstructor: ",{weeks})
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
  
  
  console.log(Object.entries(weeks))


  console.log({routineSchedule})
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

  routineSetGroups.map(set_group => {
    console.log({set_group})
    routineSchedule[set_group.week_number][set_group.day_number].set_groups.push(set_group)
  }) 

  console.log({routineSchedule})

  return routineSchedule
}

