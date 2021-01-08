import { ExerciseSetCard } from "../exercise_set/card_exercise_set/ExerciseSetCard"

export const canMoveNext = (setGroupType, chosenExercises) => {

  switch(setGroupType){

    case "Drop" || "Straight" || "Manual":
      return chosenExercises.length > 0
    case "Super" || "Super - Antagonist" || "Super - Compound" || "Circuit" 
    || "Stripping" || "Pre-Exhaustion" || "Rest - Pause" || "Pyramid":
      return chosenExercises.length > 1
    case "Super - Tri":
      return chosenExercises.length === 3
    case "Super - Giant":
      return chosenExercises.length === 4

    default:
      return true
  }


}

export const canMoveNextFromThisExerciseCard = (exercise, setGroupType, chosenExercises) => {
  switch(setGroupType){

    case "Drop" || "Straight" || "Manual":
      return chosenExercises.length > 0 && chosenExercises.some(ex => ex._id === exercise._id)
    case "Super" || "Super - Antagonist" || "Super - Compound" || "Circuit" 
    || "Stripping" || "Pre-Exhaustion" || "Rest - Pause" || "Pyramid":
      return chosenExercises.length > 1
    case "Super - Tri":
      return chosenExercises.length === 3
    case "Super - Giant":
      return chosenExercises.length === 4

    default:
      return true
  }
}

export const canAddThisExercise = (exercise, setGroupType, chosenExercises) => {
  switch(setGroupType){

    case "Drop" || "Straight" || "Manual":
      return chosenExercises.length < 1

    case "Super" || "Super - Antagonist" || "Super - Compound" || "Circuit" 
    || "Stripping" || "Pre-Exhaustion" || "Rest - Pause" || "Pyramid":
      return !chosenExercises.some(ex => ex._id === exercise._id)

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
    case "Drop" || "Straight" || "Manual":
      return 0
    case "Super" || "Super - Antagonist" || "Super - Compound" || "Circuit" 
    || "Stripping" || "Pre-Exhaustion" || "Rest - Pause" || "Pyramid":
      return chosenExercises.length - 1
    case "Super - Tri":
      return chosenExercises.length - 3
    case "Super - Giant":
      return chosenExercises.length - 4
    default:
      return true
  }

}