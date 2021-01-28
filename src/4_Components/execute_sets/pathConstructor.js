export const pathConstructor = (routineName, setGroupId, set) => {
  return(
  '/execute-sets/'
  .concat(`${routineName}/`)
  .concat(`${setGroupId}/`)
  .concat(`${set.exercise.name ? set.exercise.name.replace(/\s/g, '') : set.exercise._id}/`)
  .concat(`${set.order}`)
  )
}