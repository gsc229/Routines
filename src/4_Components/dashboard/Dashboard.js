import React from 'react'
import { connect } from 'react-redux'
import { getNonOrdinalExSetDataFromFlattendRotuines } from './helpers/exerciseStratification'
import { getStratifiedDates } from './helpers/dateStratification'
import ExercisePies from './ExercisePies'
import LineChart from '../line_chart/LineChart'
import {testData} from '../line_chart/testData'
import { testData2 } from '../line_chart/testData2'

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
      <LineChart data={testData2} />
      <div style={{display: 'flex'}}>
        <pre style={{color: 'white'}}>{JSON.stringify(seriesData, null, 2)}</pre>
        <pre style={{color: 'white'}}>{JSON.stringify(testData2, null, 2)}</pre>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
