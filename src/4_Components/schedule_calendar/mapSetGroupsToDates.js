import moment from 'moment'

const mapSetGroupsToDates = (userRoutines) => {
  const format = 'MM-DD-YYYY'
  const dateSetGroups = {}

  userRoutines && 
  userRoutines.forEach(routine => {

    const routineStartDate = moment(routine.start_date)
    routine.weeks && 
    routine.weeks
    .sort((a, b) => a.week_number - b.week_number)
    .forEach((week, idx) => {
      const weekStartDate = week.week_number > 1 ? routineStartDate.add(1,'week') : routineStartDate
      week.set_groups && 
      week.set_groups
      .sort((a, b) => a.order - b.order)
      .forEach(sg => {
        const weekStartCopy = weekStartDate.clone()
        const sgDate = weekStartCopy.add(sg.day_number, 'day').format(format)
        if(!dateSetGroups[sgDate]){
          dateSetGroups[sgDate] = []
        }
        dateSetGroups[sgDate] = [...dateSetGroups[sgDate], sg]
      })
    })
  })

  return dateSetGroups
}

export default mapSetGroupsToDates