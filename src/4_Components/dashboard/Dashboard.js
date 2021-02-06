import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getNonOrdinalExSetDataFromFlattendRotuines } from './helpers/exerciseStratification'
import mapSgsToDates from '../calendar/mapRoutinesToDates'
import { combineExSets } from './helpers/combineExSets'
import { getMonthCalendarWeeksMuscleGroupData } from './helpers/getMonthCalendarWeeksMuscleGroupData'
import ExercisePies from './ExercisePies'
import LineChart from '../line_chart/LineChart'
import MucleGroupSelector from './MuscleGroupSelector'
import { testData2 } from '../line_chart/testData2'


export const Dashboard = ({
  userRoutines  
}) => {

  const muscleGroupList = [{name: "Chest", color: ''}, {name: "Back", color: ''}, {name: "Arms", color: ''}, {name: "Shoulders", color: ''}, {name: "Legs", color: ''}, {name: "Calves", color: ''}, {name: "Full Body", color: ''}]
  
  const [combinedExSets, setCombinedExSets] = useState([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(muscleGroupList)
  const [weekIdDate, setWeekIdDate] = useState({})
  const [startDate, setStartDate] = useState(moment())
  const [field, setField] = useState('target_weight')
  const [lineChartMuscleGroupData, setLineChartMuscleGroupData] = useState([])


  const [setGroupIdDate, setSetGroupIdDate] = useState({})
  const [endDatesRtouines, setEndDatesRoutines] = useState({})

  useEffect(() => {
    const {datesSetGroups, setGroupIdDate, weekIdDate, endDatesRtouines} = mapSgsToDates(userRoutines)
   
    setWeekIdDate(weekIdDate)
    setSetGroupIdDate(setGroupIdDate)
    setEndDatesRoutines(endDatesRtouines)
    setCombinedExSets(combineExSets(userRoutines))
  },[userRoutines])

  
  useEffect(() => {
    const newLineChartData = getMonthCalendarWeeksMuscleGroupData(combinedExSets, selectedMuscleGroups, weekIdDate, startDate, field).muscleGroupSets
    setLineChartMuscleGroupData(newLineChartData)
  }, [combinedExSets, selectedMuscleGroups, weekIdDate, startDate, field])

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
      <div className="month-picker-container">
        <label htmlFor="month">Your Activity:</label>
        <input 
        onChange={selectDate}
        placeholder='Choose Month'
        value={startDate.clone().format('YYYY-MM')}
        type="month" id="month" name="month" />
      </div>
      <div className='visualizations-container'>
        <ExercisePies exerciseNameExSetCount={exerciseNameExSetCount} muscleGroupCount={muscleGroupCount} />
        <MucleGroupSelector 
        muscleGroupList={muscleGroupList}
        selectedMuscleGroups={selectedMuscleGroups} 
        setSelectedMuscleGroups={setSelectedMuscleGroups} />
        <LineChart data={lineChartMuscleGroupData} />
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
