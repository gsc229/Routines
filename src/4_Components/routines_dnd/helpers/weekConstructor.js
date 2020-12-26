export const weekConstructor = (setGroups) => {

  const convertFormat = {
    M: "Mo",
    T: "Tu",
    W: "We",
    R: "Th",
    F: "Fr",
    S: "Sa",
    U: "Su"
  }

  let weekWithSetGroups = {
    
    "Su": {
      name: "Sunday",
      set_groups: []
    },
    "Mo": {
      name: "Monday",
      set_groups: []
    },
    "Tu": {
      name: "Tuesday",
      set_groups: []
    },
    "We": {
      name: "Wednesday",
      set_groups: []
    },
    "Th": {
      name: "Thursday",
      set_groups: []
    },
    "Fr": {
      name: "Friday",
      set_groups: []
    },
    "Sa": {
      name: "Saturday",
      set_groups: []
    },
}

  console.log({setGroups})
  setGroups && setGroups.map(set_group => {
    console.log("BEFORE: ",set_group.day ,set_group)
    if(convertFormat[set_group.day]){
      set_group = {...set_group, day: convertFormat[set_group.day]} 
    }
    
    console.log("AFTER: ",set_group.day ,set_group)
   return set_group.day && weekWithSetGroups[set_group.day].set_groups.push(set_group)
  })

  console.log("weekConstructor: ",{setGroups})
  console.log("weekConstructor: ",{weekWithSetGroups})
  return weekWithSetGroups

}