

export const routineScheduleConstructor = (routineSetGroups, weeks) => {
  console.log('weeks.length: ', weeks.length)
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
  /* 
    {
      1: {

      }
    }
  */

  for(let i = 1; i <= weeks.length; i++){
    routineSchedule[i] = {}
    for(let j = 1; j <= 7; j++ ){
      routineSchedule[i][j] = {
        day_name: dayKey[j],
        day_number: j,
        set_groups: []
      }
    }
    
  }

  console.log({routineSchedule})

  routineSetGroups.map(set_group => {
    console.log({set_group})
    routineSchedule[set_group.week_number][set_group.day_number].set_groups.push(set_group)
  })

  return routineSchedule
}

