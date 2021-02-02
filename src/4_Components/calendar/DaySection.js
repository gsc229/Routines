import React, {useState} from 'react'
import { connect } from 'react-redux'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {setFlattenedRoutine} from '../../1_Actions/routineActions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import ViewSetGroupModal from '../modals/view_modals/ViewSetGroupModal'
import moment from 'moment'

export const DaySection = ({
  daySetGroups,
  day,
  userRoutines,
  routineNamesColorsStartDates,
  setCurrentSetGroup,
  setFlattenedRoutine,
  showEditLink=false,
  windowSize
}) => {

  const [modalShow, setModalShow] = useState(false)
  const {width} = windowSize

  const handleClick = (sg) => { 

    const selectedRoutine = {...userRoutines.find(routine => routine._id === sg.routine)}
    const flattenedRoutine = {
      routine: selectedRoutine,
      weeks: selectedRoutine.weeks,
      set_groups: selectedRoutine.set_groups,
      exercise_sets: selectedRoutine.exercise_sets
    }
    setFlattenedRoutine(flattenedRoutine)
    setCurrentSetGroup(sg)
    setModalShow(sg._id)
  }

  return (
    <div 
    onClick={e => width >= 400 && e.stopPropagation()}
    className='day-sections'>
      
      {daySetGroups && daySetGroups.sort((a, b) => a.routine - b.routine).map(sg => {
        const startDate = moment(userRoutines.find(rt => rt._id === sg.routine).start_date)
        const fromStartDays = day.diff(startDate, 'days') + 1
        const fromStartWeeks = day.diff(startDate, 'weeks') + 1
        const fromWeekStartDays = day.day() + 1
        return(
          <div 
          key={sg._id}
          className='day-section-wrapper'>

            <ViewSetGroupModal
            showEditLink={showEditLink}
            redirectLink={`/create-set-group/${routineNamesColorsStartDates[sg.routine].name }/${sg.week_number}/day-${sg.day_number}-${sg.day}`}
            setModalShow={setModalShow} 
            modalShow={modalShow === sg._id} />

            <OverlayTrigger 
            overlay={
            <ToolTip>
              <div 
              style={{color: routineNamesColorsStartDates[sg.routine].color, fontWeight: 'bold'}}
              className='tool-tip-title'>
                {routineNamesColorsStartDates[sg.routine].name} Week: {fromStartWeeks} <br/> Wk. Day: {fromWeekStartDays}&nbsp; (Rt. Day: {fromStartDays})
              </div>
              <p>{sg.name}</p>
            </ToolTip>}>
              <div
                onClick={ () => width >= 400 && handleClick(sg) }
                className='day-marker'
                style={{backgroundColor: routineNamesColorsStartDates[sg.routine].color}}>
              </div>
            </OverlayTrigger>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  setCurrentSetGroup,
  setFlattenedRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(DaySection)
