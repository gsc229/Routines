export const pathConstructor = (date, routineName, setGroupId, set, base=0) => {
  return(
  '/execute-sets/'
  .concat(`${date}/`)
  .concat(`${routineName}/`)
  .concat(`${setGroupId}/`)
  .concat(`${set.exercise.name ? set.exercise.name.replace(/\s/g, '') : set.exercise._id}/`)
  .concat(`${set.order + base}`)
  )
}