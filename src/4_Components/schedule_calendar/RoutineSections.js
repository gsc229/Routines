import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

export const RoutineSections = ({
  userRoutines
}) => {
  return (
    <div className='routine-sections'>
      <div 
      className='routine-section'
      style={{backgroundColor: 'red'}}></div>
      <div 
      className='routine-section'
      style={{backgroundColor: 'blue'}}></div>
      <div 
      className='routine-section'
      style={{backgroundColor: 'yellow'}}></div>
      <div 
      className='routine-section'
      style={{backgroundColor: 'orange'}}></div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutineSections)
