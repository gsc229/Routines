import SetGroup from '../set_group/SetGroup'

export const routineScheduleConstructor = (routineSetGroups, numberOfWeeks) => {

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

  for(let i = 1; i <= numberOfWeeks; i++){
    routineSchedule[i] = {}
    for(let j=1; j<=7; j++){
      routineSchedule[i][j] = {
        day_name: dayKey[j],
        set_groups: []
      }
    }
  }

  routineSetGroups.map(set_group => 
    routineSchedule[set_group.week_number][set_group.day_number].push(<SetGroup set_group={set_group} />))
  return routineSchedule
}

