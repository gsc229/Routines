export const upperCaseIfyField = (field) => {
  return field.split('_').map(word => word[0].toUpperCase() + word.slice(1, word.length)).join(' ')
}

export const getExSetActiveFields = (currentExerciseSet, noValueStr=null) => {
  const activeTargets = []
  const activeActuals = []
  const targetToActuals = {}
  
  Object.keys(currentExerciseSet).forEach(field => {
    if(field.includes('target') && currentExerciseSet[field] && currentExerciseSet[field] > 0){

      const targetName = upperCaseIfyField(field)
      activeTargets.push({name: targetName, field_name: field , value: currentExerciseSet[field]})
      
      const actualField = field.replace('target', 'actual')
      const actualName = targetName.replace('Target', 'Actual')
      const actualValue = currentExerciseSet[actualField] === null ? noValueStr : currentExerciseSet[actualField]
      const activeObj = {name: actualName, field_name: actualField, value: actualValue }
      
      activeActuals.push(activeObj)
      targetToActuals[field] = activeObj

    }
  })
  console.log({activeTargets, activeActuals, targetToActuals})
  return {activeTargets, activeActuals, targetToActuals}
}