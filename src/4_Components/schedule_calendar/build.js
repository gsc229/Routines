export default function buildCalendar(value, userRoutines){
    const monthStartDay = value.clone().startOf("month").startOf("week")
    const monthEndDay = value.clone().endOf("month").endOf("week")
    const day = monthStartDay.clone().subtract(1, "day")
    
    const calendar = []
    
    while(day.isBefore(monthEndDay, "day")){
      calendar.push(
        Array(7).fill(0).map(() => {
          return day.add(1, "day").clone()
        })
      )
    }

    return calendar
}

