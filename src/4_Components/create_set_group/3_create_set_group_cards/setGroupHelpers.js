export const getExSetTarget = (exercise_set) => {
  console.log({exercise_set})
  const possibleTargets = Object.keys(exercise_set).filter(key=> key.includes('target'))
  

  let foundTargets = []

  possibleTargets.map(key => {
    if(exercise_set[key]){
      const targetName = key.split("_").pop()// remove target_
      foundTargets.push(`${targetName}: ${exercise_set[key]}`)
    }
  })

  console.log({possibleTargets, foundTargets})

  if(!foundTargets.length){
    return "no targets set"
  } 

  return foundTargets.split("").join(" - ")

}