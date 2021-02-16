export const muscleGroupList = [
  {name: "Chest", color: '#9056D6'}, 
  {name: "Back", color: '#FF0E0A'} , 
  {name: "Abs", color: '#FF1FFF'}, 
  {name: "Arms", color: '#ff8800'}, 
  {name: "Shoulders", color: '#24F92B'}, 
  {name: "Legs", color: '#23F3FB'}, 
  {name: "Calves", color: '#004FFF'}, 
  {name: "Full Body", color: '#F6FD35'}
]


const converArrayToObj = () => {
  const obj = {} 
  muscleGroupList.forEach(nameColor => obj[nameColor.name] = nameColor)
  return obj
}

export const muscleGroupColorObj = converArrayToObj()