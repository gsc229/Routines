import React from 'react'
import { connect } from 'react-redux'
import { getNonOrdinalExSetDataFromFlattendRotuines } from './helpers/exerciseStratification'
import { getStratifiedDates } from './helpers/dateStratification'
import ExercisePies from './ExercisePies'
import LineChart from '../line_chart/LineChart'

export const Dashboard = ({
  userRoutines  
}) => {

  const seriesData = getStratifiedDates('', '', userRoutines)

  const {
    exerciseNameExSetCount,
    muscleGroupCount
  } = getNonOrdinalExSetDataFromFlattendRotuines(userRoutines)

  return (
    <div className='dashboard'>
      <ExercisePies exerciseNameExSetCount={exerciseNameExSetCount} muscleGroupCount={muscleGroupCount} />
      <LineChart data={seriesData} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
