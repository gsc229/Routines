import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import SetGroup from '../set_group/SetGroup'

export const RoutineWeeksBank = ({weeks, currentRoutine}) => {



  return (
    <div className='routine-weeks-bank'>
      {weeks.length > 0 && 
      <div style={{height: '300px', border: '1px solid green'}} className="weeks-container">
          <h6>Weeks go here</h6>
          {weeks && weeks.map(week => 
          <div className='weeks-bank-week'>
            <p>Week: {week.week_number} - id: {week._id}</p>
            <Link to={
              `/create-set-group/${currentRoutine.slug ? currentRoutine.slug : currentRoutine.name}/week-${week.week_number}`}>
               Add Set Group
            </Link>
            <div 
            style={{display: 'flex'}}
            className='week-bank-week-set-groups'>
              {week.set_groups.sort(set => set.day_number).map(set=> 
              <div
              style={{border: '2px solid red'}}
              className='week-bank-set-group'>
                <SetGroup set_group={set} />
              </div>)}
            </div>
          </div>)}
          {JSON.stringify(weeks[0].set_groups,null, 2)}
      </div>}
      {!weeks.length && 
      <div className="no-weeks-container">
        <p>You currently don't have anything scheduled. Click 'Create Set Group' to start building this routine</p>
      </div>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  weeks: state.routineReducer.currentRoutine.weeks,
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineWeeksBank)
