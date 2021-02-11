import moment from 'moment'



export const getMonthCalendarWeeksMuscleGroupData = (exSets=[{}], muscleGroups=[], weekIdDate={}, monthMoment, field, format='YYYY-MM-DD', duration='month') => {
  console.log({field})
  const startMoment = monthMoment.clone().startOf(duration).startOf('month').startOf('week').startOf('day')
  const endMoment = monthMoment.clone().endOf(duration).endOf('week').endOf('day').add(1, 'day')
  const numWeeks = endMoment.diff(startMoment, 'weeks')
  const weekRanges = {}
  const weekIdWeekName = {}
  let currentRangeStart = startMoment.clone()
  let currentRangeEnd = currentRangeStart.clone().add(6, 'days')

  /* 
  old label
  `W:${i} : ${currentRangeStart.clone().format('DD-MMM')}-${currentRangeEnd.clone().format('DD-MMM')}`
  */

  for(let i = 1; i <= numWeeks; i++){
    weekRanges[`${currentRangeStart.clone().format('YYYY-MM-DD')}`] = {start: currentRangeStart.format(format), end: currentRangeEnd.format(format)}
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

  muscleGroups && muscleGroups.forEach(groupObj => {
    const data = {}
    Object.keys(weekRanges).forEach(weekName => data[weekName] = {x: weekName, y: 0})
    muscleGroupSets[groupObj.name] = {id: groupObj.name, color: groupObj.color, data}
  })

  muscleGroups && exSets.forEach(set => {
    const muscleGroup = set.exercise.muscle_group
    if(weekIdWeekName[set.week] && muscleGroupSets[muscleGroup]){
      const weekOfSet = weekIdWeekName[set.week]
      const muscleGroupData = muscleGroupSets[muscleGroup].data
      const currentY = muscleGroupData[weekOfSet]['y'] || 0
      muscleGroupData[weekOfSet]['y'] = currentY + set[field]
    }
  })

  Object.keys(muscleGroupSets).map(muscleGroup => {
    const dataObject = muscleGroupSets[muscleGroup].data 
    muscleGroupSets[muscleGroup].data = Object.keys(dataObject).map(datum => dataObject[datum])
  })

  
  muscleGroupSets = Object.keys(muscleGroupSets).map(muscleName => muscleGroupSets[muscleName] )

  return{startMoment, endMoment, weekIdDate, weekRanges, weekIdWeekName, weekMuscleGroupSets, muscleGroupSets}

}