import React from 'react'
import { connect } from 'react-redux'
import {IoDuplicateOutline} from 'react-icons/io5'
import {clearErrorMessage} from '../../1_Actions/userActions'
import {createNewSetGroup} from '../../1_Actions/setGroupActions'
import {createNewExerciseSets} from '../../1_Actions/exerciseSetActions'
import {numberToDay} from './schedule_helpers/routineScheduleConstructor'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const DuplicateTo = ({
  set_group,
  currentRoutineSets,
  createNewExerciseSets,
  createNewSetGroup,
  currentWeeks,
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
        const newSetsResponse = await createNewExerciseSets(newSets)
    }
  }

  

  return (
    <NavDropdown 
    color='white'
    title='Duplicate to'
    id='duplicate-to-week-dropdown'
    className='duplicate-to'>
      {currentWeeks.map(week => 
        <NavDropdown
        key={week._id}
        className='duplicate-to-day-dropdown'
        color='white'
        title={`Week: ${week.week_number}`}>
          {Object.keys(numberToDay).map(num => 
            <NavDropdown.Item
            key={`${week._id}-day-${num}`}
            >
              {numberToDay[num].long}
            </NavDropdown.Item>
          )}
        </NavDropdown>
        
      )}
    </NavDropdown>
  )
}

const mapStateToProps = (state) => ({
  currentRoutineSets: state.exerciseSetReducer.currentRoutineSets,
  set_group_ERROR: state.setGroupReducer.error_message,
  exercise_set_ERROR: state.exerciseSetReducer.error_message,
  currentWeeks: state.weekReducer.currentWeeks
})

const mapDispatchToProps = {
  createNewSetGroup,
  createNewExerciseSets,
  clearErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateTo)
