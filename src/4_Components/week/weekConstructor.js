export const weekConstructor = (weekData) => {
  let weekExercises = {
    
    "Su": {
      name: "Sunday",
      items: []
    },
    "Mo": {
      name: "Monday",
      items: []
    },
    "Tu": {
      name: "Tuesday",
      items: []
    },
    "We": {
      name: "Wednesday",
      items: []
    },
    "Th": {
      name: "Thursday",
      items: []
    },
    "Fr": {
      name: "Friday",
      items: []
    },
    "Sa": {
      name: "Saturday",
      items: []
    },
}

  
  weekData && weekData[0].exercise_sets.map(exercise => {
   return weekExercises[exercise.day].items.push(exercise)
  })

  return weekExercises

}