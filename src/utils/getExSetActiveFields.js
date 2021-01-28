export const getExSetActiveFields = (currentExerciseSet) => {
  const activeTargets = []
  const activeActuals = []
  const targetToActuals = {}
  const upperCaseIfy = (field) => {
    return field.split('_').map(word => word[0].toUpperCase() + word.slice(1, word.length)).join(' ')
  }
  Object.keys(currentExerciseSet).forEach(field => {
    if(field.includes('target') && currentExerciseSet[field] && currentExerciseSet[field] > 0){

      const targetName = upperCaseIfy(field)
      activeTargets.push({name: targetName, field_name: field , value: currentExerciseSet[field]})
      
      const actualField = field.replace('target', 'actual')
      const actualName = targetName.replace('Target', 'Actual')
      const activeObj = {name: actualName, field_name: actualField, value: currentExerciseSet[actualField]}
      activeActuals.push(activeObj)

      targetToActuals[field] = activeObj

    }
  })
  return {activeTargets, activeActuals, targetToActuals}
}