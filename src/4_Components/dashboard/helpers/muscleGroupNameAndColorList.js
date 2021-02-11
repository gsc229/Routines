export const muscleGroupList = [
  {name: "Chest", color: '#80599c'}, 
  {name: "Back", color: '#42b0f5'} , 
  {name: "Abs", color: '#f542d7'}, 
  {name: "Arms", color: '#ffa808'}, 
  {name: "Shoulders", color: '#409928'}, 
  {name: "Legs", color: '#3dd9bf'}, 
  {name: "Calves", color: '#3040f0'}, 
  {name: "Full Body", color: '#d1d93d'}
]


const converArrayToObj = () => {
  const obj = {} 
  muscleGroupList.forEach(nameColor => obj[nameColor.name] = nameColor)
  return obj
}

export const muscleGroupColorObj = converArrayToObj()