import moment from 'moment'

const mapSetGroupsToDates = (userRoutines=[], format="MM-DD-YYYY") => {
  
  const datesSetGroups = {}
  const setGroupIdDate = {}
  const routinesEndDates = {}
  const endDatesRtouines = {}
  const weekIdDate = {}

  userRoutines && 
  userRoutines.forEach(routine => {
    const routineStartDate = moment.utc(routine.start_date)

    const currentDatesSetGroups = {}
    
    

    routine.weeks && 
    routine.weeks
    .sort((a, b) => a.week_number - b.week_number)
    .forEach((week, idx) => {

      const weekStartDate = week.week_number > 1 ? routineStartDate.add(1,'week') : routineStartDate
      weekIdDate[week._id] = weekStartDate.format(format)

      routine.set_groups && 
      routine.set_groups
      .filter(sg => sg.week === week._id)
      .sort((a, b) => a.order - b.order)
      .forEach(sg => {
        const weekStartCopy = weekStartDate.clone()
        const sgDate = weekStartCopy.add(sg.day_number - 1, 'day').format(format)

        setGroupIdDate[sg._id] = sgDate
     
        if(!datesSetGroups[sgDate]){
          datesSetGroups[sgDate] = []
        }
        if(!currentDatesSetGroups[sgDate]){
          currentDatesSetGroups[sgDate] = []
        }

        datesSetGroups[sgDate] = [...datesSetGroups[sgDate], sg]
        currentDatesSetGroups[sgDate] = [...currentDatesSetGroups[sgDate], sg]
      })
    })

    const getEndDate = () => {
      if(routine.set_groups){
        const dates =  Object.keys(currentDatesSetGroups).sort((a, b) => moment(a, format) - moment(b, format))
        const endDate = moment.utc(dates[dates.length - 1]).format(format)
        
        return endDate
  
      } else return 'n/a'
    }
    
    routinesEndDates[routine._id] = getEndDate()
    endDatesRtouines[getEndDate()] = routine._id
  })
  
  return {datesSetGroups, routinesEndDates, endDatesRtouines, setGroupIdDate, weekIdDate}
}

export default mapSetGroupsToDates