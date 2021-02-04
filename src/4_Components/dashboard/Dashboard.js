import React from 'react'
import { connect } from 'react-redux'
import { getNonOrdinalExSetDataFromFlattendRotuines } from './helpers/stratifyExSets'
import NivoPie from '../pie_chart/NivoPie'

export const Dashboard = ({
  userRoutines  
}) => {

  const {
    exerciseNameExSetCount,
    muscleGroupCount
    
  } = getNonOrdinalExSetDataFromFlattendRotuines(userRoutines)

  return (
    <div className='dashboard'>
      <NivoPie exSetStratumData={muscleGroupCount}  />
      <NivoPie exSetStratumData={exerciseNameExSetCount} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
