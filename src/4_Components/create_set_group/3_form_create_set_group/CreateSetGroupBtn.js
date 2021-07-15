import React from 'react'
import { connect } from 'react-redux'
import {clearErrorMessage} from '../../../1_Actions/userActions'
import {createNewSetGroup, fullResetCreateSetGroup} from '../../../1_Actions/setGroupActions'
import {createNewExerciseSets, setCurrentExerciseSets} from '../../../1_Actions/exerciseSetActions'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {GiBiceps} from 'react-icons/gi'


export const CreateSetGroupBtn = ({
  changesSaved, 
  setChangesSaved,
  currentSetGroup,
  currentExerciseSets,
  createNewSetGroup,
  createNewExerciseSets,
  crudingSetGroup
}) => {

  
  const handleCreateSetGroup = async () => {

    const newSetGroupResponse = await createNewSetGroup(currentSetGroup)

    if(newSetGroupResponse.success){

      const setsWithSetGroupAndExerciseIds = currentExerciseSets.map(set=>{
        return{
          ...set,
          exercise: set.exercise._id,
          set_group: newSetGroupResponse.data._id
        }
      })

      const newExerciseSetsResponse = await createNewExerciseSets(setsWithSetGroupAndExerciseIds)

      // Want to manually update the weeks, set_groups and exercise_sets on the current routine
      // will need to populate the newly created exercise_sets with their exercises. 
      if(newExerciseSetsResponse.success){
       setChangesSaved(true)
      }

    }
  }

  

  const getButtonMessage = () => {

    if(!crudingSetGroup && !changesSaved){
      return (
        <div className='btn-message'>
          Create Set Group&nbsp;
          <GiBiceps/>
        </div>
      )
    }

    if(crudingSetGroup === 'creating-set-group'){
      return (
        <div className='btn-message'>
          Saving Changes &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </div>
      )
    }

    if(!crudingSetGroup && changesSaved){
      return (
        <div className='btn-message'>
          Set Group Saved!
        </div>
      )
    }
  }


  return (
    <Button
    disabled={currentExerciseSets.length < 1}
    variant='success'
    onClick={handleCreateSetGroup}>
      {getButtonMessage()}
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
  exercise_set_error_message: state.exerciseSetReducer.error_message,
  crudingSetGroup: state.setGroupReducer.crudingSetGroup
})

const mapDispatchToProps = {
  setCurrentExerciseSets,
  createNewSetGroup,
  createNewExerciseSets,
  clearErrorMessage,
  fullResetCreateSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupBtn)
