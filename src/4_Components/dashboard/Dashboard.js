import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { getNonOrdinalExSetDataFromFlattendRotuines } from './helpers/exerciseStratification'
import mapSgsToDates from '../calendar/mapRoutinesToDates'
import { combineExSets } from './helpers/combineExSets'
import { getMonthCalendarWeeksMuscleGroupData } from './helpers/getMonthCalendarWeeksMuscleGroupData'
import moment from 'moment'
import ExercisePies from './ExercisePies'
import LineChart from '../line_chart/LineChart'
import { testData2 } from '../line_chart/testData2'

export const Dashboard = ({
  userRoutines  
}) => {

  const muscleGroupList = ["Chest", "Back", "Arms", "Shoulders", "Legs", "Calves", "Full Body"]
  
  const [combinedExSets, setCombinedExSets] = useState([])
  const [muscleGroups, setMuscleGroups] = useState(muscleGroupList)
  const [weekIdDate, setWeekIdDate] = useState({})
  const [startDate, setStartDate] = useState(moment())
  const [field, setField] = useState('target_weight')
  const [lineChartMuscleGroupData, setLineChartMuscleGroupData] = useState([])


  const [setGroupIdDate, setSetGroupIdDate] = useState({})
  const [endDatesRtouines, setEndDatesRoutines] = useState({})

  useEffect(() => {
    const {datesSetGroups, setGroupIdDate, weekIdDate, endDatesRtouines} = mapSgsToDates(userRoutines)
    
    console.log({weekIdDate})
    setWeekIdDate(weekIdDate)
    setSetGroupIdDate(setGroupIdDate)
    setEndDatesRoutines(endDatesRtouines)
    setCombinedExSets(combineExSets(userRoutines))
  },[userRoutines])

  
  useEffect(() => {
    const newLineChartData = getMonthCalendarWeeksMuscleGroupData(combinedExSets, muscleGroups, weekIdDate, startDate, field).muscleGroupSets
    setLineChartMuscleGroupData(newLineChartData)
  }, [combinedExSets, muscleGroups, weekIdDate, startDate, field])

  const {
    exerciseNameExSetCount,
    muscleGroupCount
  } = getNonOrdinalExSetDataFromFlattendRotuines(userRoutines)

  const selectDate = (e) => {
    const newMomenet = moment.utc(e.target.value)
    setStartDate(newMomenet)
  }


  return (
    <div className='dashboard'>
      <ExercisePies exerciseNameExSetCount={exerciseNameExSetCount} muscleGroupCount={muscleGroupCount} />
      <div className="line-chart-header">
      <label htmlFor="month">Pick Month:</label>
        <input 
        onChange={selectDate}
        type="month" id="month" name="month" />
      </div>
      <LineChart data={lineChartMuscleGroupData} />
      <div style={{display: 'flex'}}>
        <pre style={{color: 'white'}}>{JSON.stringify(weekIdDate, null, 2)}</pre>
        <pre style={{color: 'white'}}>{JSON.stringify(testData2, null, 2)}</pre>
        <pre 
        style={{color: 'white'}}>
          {JSON.stringify(getMonthCalendarWeeksMuscleGroupData(combinedExSets, muscleGroups, weekIdDate, startDate, field), null, 2)}
        </pre>
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
