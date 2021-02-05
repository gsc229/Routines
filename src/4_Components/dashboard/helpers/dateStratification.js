import moment from 'moment'
import mapSetGroupsToDates from '../../calendar/mapSetGroupsToDates'



export const getStratifiedDates = (startDate='', endDate='', userRoutines) => {
  const {setGroupIdDate} = mapSetGroupsToDates(userRoutines)
  const combinedExSets = []
  const uniqueExercises = []
  const dateExSets = {}
  const seriesData = []

  userRoutines.forEach(rt => combinedExSets.push(...rt.exercise_sets))

  combinedExSets.forEach(set => {
    if(uniqueExercises.indexOf(set.exercise.name) === -1){
      uniqueExercises.push(set.exercise.name)
    }
  })
  
  Object.keys(setGroupIdDate).forEach(sgId => {
    dateExSets[setGroupIdDate[sgId]] = combinedExSets.filter(set => set.set_group === sgId)
  })

  uniqueExercises.forEach(exName => {
      const series = { id: exName, data: [] }

      const currentSets = combinedExSets.filter(exSet => exSet.exercise.name === exName)

      const uniqueDates = []

      currentSets.forEach(set => {
        if(uniqueDates.indexOf(setGroupIdDate[set.set_group]) === -1){
          uniqueDates.push(setGroupIdDate[set.set_group])
        }
      })

      uniqueDates.forEach(date => { 
        const setsOfDate = currentSets.filter(exSet => setGroupIdDate[exSet.set_group] === date)
        const y = setsOfDate.reduce((accum, curr) => { 
          if(curr.target_weight){
            return accum + curr.target_weight
          } else return accum + 0
         } , 0)
        series.data.push({x: date, y})
      })

      seriesData.push(series)
    
  })
  
  console.log({seriesData})
  return seriesData
}


/* 
[{
    "id": "Serie 1",
    "data": [
      {
        "x": 2000,
        "y": 10
      },
      {
        "x": 2001,
        "y": 3
      },
      {
        "x": 2002,
        "y": 12
      },
      {
        "x": 2003,
        "y": 9
      },
      {
        "x": 2004,
        "y": 9
      }
    ]
  }],


*/