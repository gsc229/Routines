export const getExSetTarget = (exercise_set) => {

  const possibleTargets = Object.keys(exercise_set).filter(key=> key.includes('target'))
  console.log(Object.keys(exercise_set))
  console.log({possibleTargets})

  let foundTargets = []

  possibleTargets.map(key => {
    if(exercise_set[key]){
      const targetName = key.split("_").pop()// remove target_
      foundTargets.push(`${targetName}: ${exercise_set[key]}`)
    }
  })

  if(foundTargets.length > 0){
    return "no targets set"
  } 

  return foundTargets.split("").join(" - ")

}