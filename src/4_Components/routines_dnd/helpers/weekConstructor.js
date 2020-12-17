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

  weekData &&  console.log("weekData.exercises", weekData[0].exercises)
  weekData && weekData[0].exercises.map(exercise => {
    weekExercises[exercise.day].items.push(exercise)
  })
  console.log({weekExercises})
  return weekExercises

}