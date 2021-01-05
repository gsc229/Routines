import React from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import {fetchFlattenedRoutine} from '../../../1_Actions/routineActions'
import {createNewSetGroup, fullResetCreateSetGroup} from '../../../1_Actions/setGroupActions'
import {createNewExerciseSets, setCurrentSetGroupSets} from '../../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'
import {GiBiceps} from 'react-icons/gi'

export const CreateSetGroupBtn = ({
  fetchFlattenedRoutine,
  currentRoutine,
  currentSetGroup,
  currentExerciseSets,
  createNewSetGroup,
  createNewExerciseSets,
  fullResetCreateSetGroup,
  set_group_error_message,
  exercise_set_error_message,
  clearErrorMessage
}) => {


  const hisotry = useHistory()
  const handleCreateSetGroup = async () => {
    console.log("CREATE NEW SET GROUP")
    const newSetGroupResponse = await createNewSetGroup(currentSetGroup)
    console.log({newSetGroupResponse})
    if(newSetGroupResponse.success){

      const setsWithSetGroupAndExerciseIds = currentExerciseSets.map(set=>{
        return{
          ...set,
          exercise: set.exercise._id,
          set_group: newSetGroupResponse.data._id
        }
      })
      console.log({setsWithSetGroupAndExerciseIds})
      const {routine, week} = newSetGroupResponse.data
      const newExerciseSetsResponse = await createNewExerciseSets({
        routine, 
        week, 
        set_group: newSetGroupResponse.data._id, 
        newSetsArray: setsWithSetGroupAndExerciseIds})

      // Want to manually update the weeks, set_groups and exercise_sets on the current routine
      // will need to populate the newly created exercise_sets with their exercises. 
      alert(newExerciseSetsResponse.success)
      if(newExerciseSetsResponse.success){
        const {_id, name, slug} = currentRoutine
        fetchFlattenedRoutine(_id)
        hisotry.push(`/view-routine/${_id}/${slug ? slug : name}`)
        fullResetCreateSetGroup()
      }

    }
  }



  return (
    <Button
    variant='success'
    onClick={handleCreateSetGroup}>
      Create Set Group&nbsp;
      <GiBiceps/>
    </Button>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  set_group_error_message: state.setGroupReducer.error_message,
  exercise_set_error_message: state.exerciseSetReducer.error_message
})

const mapDispatchToProps = {
  fetchFlattenedRoutine,
  setCurrentSetGroupSets,
  createNewSetGroup,
  createNewExerciseSets,
  clearErrorMessage,
  fullResetCreateSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupBtn)
