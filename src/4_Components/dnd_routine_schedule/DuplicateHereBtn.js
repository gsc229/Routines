import React from 'react'
import { connect } from 'react-redux'
import {IoDuplicateOutline} from 'react-icons/io5'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {createNewSetGroup} from '../../1_Actions/setGroupActions'
import {createNewExerciseSets} from '../../1_Actions/exerciseSetActions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'

export const DuplicateHereBtn = ({
  set_group,
  currentRoutineSets,
  createNewExerciseSets,
  createNewSetGroup,
  clearErrorMessage,
  set_group_ERROR,
  exercise_set_ERROR
}) => {

  const duplicate = async () => {
    const newSetGroup = {
      ...set_group
    }
    delete newSetGroup._id
    delete newSetGroup.id

    const newSetGroupResponse = await createNewSetGroup(newSetGroup)

    if(newSetGroupResponse.success){
        const newSets = currentRoutineSets.filter(exSet => exSet.set_group === set_group._id)
        .map(set =>  {
          delete set._id
          delete set.id
          return{
            ...set,
            exercise: set.exercise._id,
            set_group: newSetGroupResponse.data._id
          }
        })
        console.log('DuplicateHereBtn: ',{newSets})
        const newSetsResponse = await createNewExerciseSets(newSets)
    }

    if(set_group_ERROR){
      alert(`DuplicateHereBtn set group error: ${set_group_ERROR}`)
      clearErrorMessage()
      
    }
    if(exercise_set_ERROR){
      alert(`DuplicateHereBtn exercise set error: ${exercise_set_ERROR}`)
      clearErrorMessage()
    }
  }

  return (
    <OverlayTrigger overlay={<ToolTip>Duplicate here</ToolTip>}>
      <IoDuplicateOutline  
      onClick={duplicate}
      style={{cursor: 'pointer', marginRight: '10px'}}/>
    </OverlayTrigger>
  )
}

const mapStateToProps = (state) => ({
  currentRoutineSets: state.exerciseSetReducer.currentRoutineSets,
  set_group_ERROR: state.setGroupReducer.error_message,
  exercise_set_ERROR: state.exerciseSetReducer.error_message
})

const mapDispatchToProps = {
  createNewSetGroup,
  createNewExerciseSets,
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateHereBtn)
