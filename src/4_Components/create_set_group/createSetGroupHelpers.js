export const minAndMaxExercisesAllowed = (setGroupType) => {
  switch(setGroupType){

    case "Drop":
    case "Stripping":
    case "Pyramid":
      return {min: 1, max: 1}
    case "Manual":
    case "Straight":
    case "Super":
    case "Super - Antagonist":
    case "Super - Compound": 
    case "Circuit": 
    case "Pre-Exhaustion":
    case "Rest - Pause": 
      return {min: 2, max: null}
    case "Super - Tri":
      return {min: 3, max: 3}
    case "Super - Giant":
      return {min: 4, max: 4}

    default:
      return true
  }
}

export const getSetComboType = (setGroupType) => {
  switch(setGroupType){

    case "Drop":
    case "Stripping":
    case "Pyramid":
      return 'single'
    case "Super - Tri":
    case "Super - Giant":
      return 'compound-limited'
    case "Manual":
    case "Straight":
    case "Super":
    case "Super - Antagonist":
    case "Super - Compound": 
    case "Circuit": 
    case "Pre-Exhaustion":
    case "Rest - Pause": 
      return 'compound-unlimited'

    default:
      return "compound-unlimited"
  }
}



export const canMoveToPreview = (setGroupType, createSetGoupData, chosenExercises) => {

  const {rep_max, starting_weight, percent_weight_decrease, weight_decrease, total_sets} = createSetGoupData


  switch(setGroupType){

    case "Drop":
    case "Straight":
    case "Manual":
    case "Pyramid":
      return total_sets !=="" && starting_weight !== ""
    case "Super":
    case "Super - Antagonist":
    case "Super - Compound": 
    case "Circuit": 
    case "Stripping":
    case "Pre-Exhaustion":
    case "Rest - Pause": 
      return chosenExercises.length > 1
    case "Super - Tri":
      return chosenExercises.length === 3
    case "Super - Giant":
      return chosenExercises.length === 4

    default:
      return true
  }


}



export const canMoveToForm = (setGroupType, createSetGoupData, chosenExercises) => {

  switch(setGroupType){

    case "Drop":
    case "Straight":
    case "Manual":
    case "Pyramid":
      return chosenExercises.length > 0
    case "Super":
    case "Super - Antagonist":
    case "Super - Compound": 
    case "Circuit": 
    case "Stripping":
    case "Pre-Exhaustion":
    case "Rest - Pause": 
      return chosenExercises.length > 1
    case "Super - Tri":
      return chosenExercises.length === 3
    case "Super - Giant":
      return chosenExercises.length === 4

    default:
      return true
  }


}

export const canMoveToFormFromAnExerciseCard = (exercise, setGroupType, chosenExercises) => {

  switch(setGroupType){
    case "Drop":
    case "Manual":
      return chosenExercises.length > 0 && chosenExercises.some(ex => ex._id === exercise._id)
    case "Super":
    case "Straight":
    case "Super - Antagonist":
    case "Super - Compound": 
    case "Circuit": 
    case "Stripping":
    case "Pre-Exhaustion":
    case "Rest - Pause": 
    case "Pyramid":
      return chosenExercises.length > 1 && chosenExercises.some(ex => ex._id === exercise._id)
    case "Super - Tri":
      return chosenExercises.length === 3 && chosenExercises.some(ex => ex._id === exercise._id)
    case "Super - Giant":
      return chosenExercises.length === 4 && chosenExercises.some(ex => ex._id === exercise._id)

    default:
      return true
  }
}

export const canAddThisExercise = (exercise, setGroupType, chosenExercises) => {
  switch(setGroupType){

    case "Drop":
    case "Manual":
      return chosenExercises.length < 1

    case "Super":
    case "Straight":
    case "Super - Antagonist":
    case "Super - Compound": 
    case "Circuit": 
    case "Stripping":
    case "Pre-Exhaustion":
    case "Rest - Pause": 
    case "Pyramid":
      return chosenExercises.length < 50

    case "Super - Tri":
      return chosenExercises.length < 3 && !chosenExercises.some(ex => ex._id === exercise._id)

    case "Super - Giant":
      return chosenExercises.length < 4 && !chosenExercises.some(ex => ex._id === exercise._id)

    default:
      return true
  }

}

export const canRemoveThisExercise = (exercise, chosenExercises) => {
  return chosenExercises.some(ex => ex._id === exercise._id)
}

export const getRemainingExercises = (setGroupType, chosenExercises) => {
  
  switch(setGroupType){
    case "Drop":
    case "Straight":
    case "Manual":
      return 0
    case "Super":
    case "Super - Antagonist":
    case "Super - Compound": 
    case "Circuit": 
    case "Stripping":
    case "Pre-Exhaustion":
    case "Rest - Pause": 
    case "Pyramid":
      return chosenExercises.length - 1
    case "Super - Tri":
      return chosenExercises.length - 3
    case "Super - Giant":
      return chosenExercises.length - 4
    default:
      return true
  }

}