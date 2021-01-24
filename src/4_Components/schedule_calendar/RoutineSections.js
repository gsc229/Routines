import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'


export const RoutineSections = ({
  dateSetGroups
}) => {


  return (
    <div className='routine-sections'>
      <div 
      className='routine-section'
      style={{backgroundColor: 'red'}}>
        <div className="day-section">
          
        </div>
      </div>
      <div 
      className='routine-section'
      style={{backgroundColor: 'blue'}}>
        <div className="day-section">
          
        </div>
      </div>
      <div 
      className='routine-section'
      style={{backgroundColor: 'yellow'}}>
        <div className="day-section">
          
        </div>
      </div>
      <div 
      className='routine-section'
      style={{backgroundColor: 'orange'}}>
        <div className="day-section">
          
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineSections)
