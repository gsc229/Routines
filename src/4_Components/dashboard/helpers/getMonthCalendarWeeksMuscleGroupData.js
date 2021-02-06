import moment from 'moment'



export const getMonthCalendarWeeksMuscleGroupData = (exSets=[{}], muscleGroups=[], weekIdDate={}, monthMoment, field, format='YYYY-MM-DD') => {
  
  const FirstDayOfMonth = monthMoment.clone().startOf('month').startOf('week').startOf('day')
  const LastDayOfMonth = monthMoment.clone().endOf('month').endOf('week').endOf('day').add(1, 'second')
  const numWeeks = LastDayOfMonth.diff(FirstDayOfMonth, 'weeks')
  const weekRanges = {}
  const weekIdWeekName = {}
  let currentRangeStart = FirstDayOfMonth.clone()
  let currentRangeEnd = currentRangeStart.clone().add(6, 'days')
  for(let i = 1; i <= numWeeks; i++){
    weekRanges[`Week ${i}`] = {start: currentRangeStart.format(format), end: currentRangeEnd.format(format)}
    currentRangeStart = currentRangeEnd.clone().add(1, 'day')
    currentRangeEnd = currentRangeStart.clone().add(6, 'days')
  }

  Object.keys(weekIdDate).forEach(wkId => {
    Object.keys(weekRanges).forEach(weekName => {
      if(moment(weekIdDate[wkId]).isBetween(moment(weekRanges[weekName].start), moment(weekRanges[weekName].end), null, '[]')){
        weekIdWeekName[wkId] = weekName
      }
      
    })
  })
  
  let muscleGroupSets = {}
  let weekMuscleGroupSets = {}

  muscleGroups && muscleGroups.forEach(group=> {
    const data = {}
    Object.keys(weekRanges).forEach(weekName => data[weekName] = {x: weekName, y: 0})
    muscleGroupSets[group] = {id: group, data}
  })

  muscleGroups && exSets.forEach(set => {
    const muscleGroup = set.exercise.muscle_group
    if(weekIdWeekName[set.week] && muscleGroupSets[muscleGroup]){
      const weekOfSet = weekIdWeekName[set.week]
      const muscleGroupData = muscleGroupSets[muscleGroup].data
      const currentY = muscleGroupData[weekOfSet]['y']
      muscleGroupData[weekOfSet]['y'] = currentY + set[field]
    }
  })

  Object.keys(muscleGroupSets).map(muscleGroup => {
    const dataObject = muscleGroupSets[muscleGroup].data 
    muscleGroupSets[muscleGroup].data = Object.keys(dataObject).map(datum => dataObject[datum])
  })

  muscleGroupSets = Object.keys(muscleGroupSets).map(muscleName => muscleGroupSets[muscleName] )

  return{FirstDayOfMonth, LastDayOfMonth, weekIdDate, weekRanges, weekIdWeekName, weekMuscleGroupSets, muscleGroupSets}

}