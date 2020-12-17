// helper functions for styling
export function isSelected(day, value){
  return value.isSame(day, 'day')
}

export function beforeToday(day){
  return day.isBefore(new Date(), 'day')
}

export function isNextMonth(day, value){
  return day.isAfter(value.endOf("month"))
}

export function isToday(day){
  return day.isSame(new Date(), 'day')
}

export function dayStyles(day, value){
  //if(isNextMonth(day)) return "next-month"
  if(beforeToday(day)) return "before"
  if(isSelected(day, value)) return "selected"
  if(isToday(day)) return "today"
}