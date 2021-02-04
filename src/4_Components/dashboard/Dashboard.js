import React from 'react'
import { connect } from 'react-redux'
import { getNonOrdinalExSetDataFromFlattendRotuines } from './helpers/exerciseStratification'
import ExercisePies from './ExercisePies'

export const Dashboard = ({
  userRoutines  
}) => {

  const {
    exerciseNameExSetCount,
    muscleGroupCount
    
  } = getNonOrdinalExSetDataFromFlattendRotuines(userRoutines)

  return (
    <div className='dashboard'>
      <ExercisePies exerciseNameExSetCount={exerciseNameExSetCount} muscleGroupCount={muscleGroupCount} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
