export const weekConstructor = (weekData) => {
  let weekExercises = {
    "M": {
      name: "Monday",
      items: []
    },
    "T": {
      name: "Tuesday",
      items: []
    },
    "W": {
      name: "Wednesday",
      items: []
    },
    "R": {
      name: "Thursday",
      items: []
    },
    "F": {
      name: "Friday",
      items: []
    },
    "S": {
      name: "Saturday",
      items: []
    },
    "U": {
      name: "Sunday",
      items: []
    }
}

  
  weekData && weekData[0].exercises.map(exercise => {
   return weekExercises[exercise.day].items.push(exercise)
  })

  return weekExercises

}