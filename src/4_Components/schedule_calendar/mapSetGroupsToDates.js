import moment from 'moment'

const mapSetGroupsToDates = (userRoutines) => {
  const format = 'MM-DD-YYYY'
  const dateSetGroups = {}

  userRoutines && userRoutines.forEach(routine => {

    const startDate = moment(routine.start_date)
    console.log({startDate: startDate.format(format)})

    console.log({routine})

    console.log({weeks: routine.weeks.sort((a, b) => a.week_number - b.week_number)})

    routine.weeks.sort((a,b) => a.week_number = b.week_number).forEach(week => {
      console.log(week.set_groups.sort((a, b) => a.day - b.day))
      week.set_groups.sort((a, b) => a.day - b.day).forEach(sg => {
        console.log(startDate.add(sg.day_number - 1, 'day').format(format))
        const sgDate = startDate.add(sg.day_number - 1, 'day').format(format)
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