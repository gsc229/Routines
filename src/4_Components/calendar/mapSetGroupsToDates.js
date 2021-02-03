import moment from 'moment'

const mapSetGroupsToDates = (userRoutines) => {
  const format = 'MM-DD-YYYY'
  const dateSetGroups = {}

  userRoutines && 
  userRoutines.forEach(routine => {

    const routineStartDate = moment.utc(routine.start_date)
    
    routine.weeks && 
    routine.weeks
    .sort((a, b) => a.week_number - b.week_number)
    .forEach((week, idx) => {

      const weekStartDate = week.week_number > 1 ? routineStartDate.add(1,'week') : routineStartDate

      routine.set_groups && 
      routine.set_groups
      .filter(sg => sg.week === week._id)
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
  
  return dateSetGroups
}

export default mapSetGroupsToDates