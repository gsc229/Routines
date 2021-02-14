import React from 'react'
import { connect } from 'react-redux'
import SetGroupScheduleCard from '../dnd_routine_schedule/SetGroupScheduleCard'


export const FindSavedSetGroup = ({
  currentSetGroups
}) => {


  return (
    <div className='find-save-set-group' >
      {currentSetGroups.sort((a, b) => b.name - a.name).map(sg => 
        <SetGroupScheduleCard 
        weekNumber={sg.weekNumber_number}
        dayNumber={sg.day_number}
        key={sg._id} 
        set_group={sg} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroups: state.setGroupReducer.currentRoutineSetGroups
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FindSavedSetGroup)
