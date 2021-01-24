import moment from 'moment'

const mapSetGroupsToDates = (userRoutines) => {
  const format = 'MM-DD-YYYY'
  const dateSetGroups = {}

  userRoutines && 
  userRoutines.forEach(routine => {

    const routineStartDate = moment(routine.start_date)
    console.log({routineStartDate: routineStartDate.format(format)})

    console.log({routine})

    console.log({weeks: routine.weeks && routine.weeks.sort((a, b) => a.week_number - b.week_number)})

    routine.weeks && 
    routine.weeks
    .forEach((week, idx) => {
      const weekStartDate = week.week_number > 1 ? routineStartDate.add(1,'week') : routineStartDate
      console.log({weekStartDate: weekStartDate.format('MM-DD-YYYY'), week})
      console.log(week.set_groups && week.set_groups.sort((a, b) => a.day - b.day))
      week.set_groups && 
      week.set_groups
      .sort((a, b) => a.order - b.order)
      .forEach(sg => {
        const weekStartCopy = weekStartDate.clone()
        const sgDate = weekStartCopy.add(sg.day_number - 1, 'day').format(format)
        if(!dateSetGroups[sgDate]){
          dateSetGroups[sgDate] = []
        }
        dateSetGroups[sgDate] = [...dateSetGroups[sgDate], sg]
      })
    })

  })

  console.log({dateSetGroups})
  return dateSetGroups
}

export default mapSetGroupsToDates