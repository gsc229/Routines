import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import mapSgsToDates from '../calendar/mapRoutinesToDates'
import { combineExSets } from './helpers/combineExSets'
import { getMonthCalendarWeeksMuscleGroupData } from './helpers/getMonthCalendarWeeksMuscleGroupData'
import {muscleGroupList, muscleGroupColorObj} from '../shared_helpers_and_variables/muscleGroupNameAndColorList'
import MuscleGroupTotalsTab from './MuscleGroupTotalsTab'
import SetBreakDownTab from './SetBreakDownTab'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export const Dashboard = ({
  userRoutines  
}) => {

  const capitalizeField = (field) => {
    return field.split('_').map(word => word[0].toUpperCase() + word.slice(1, word.length)).join(" ")
  }
  
  const [tabKey, setTabKey] = useState('set-breakdown')
  const [combinedExSets, setCombinedExSets] = useState([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(muscleGroupList)
  const [dateMaps, setDateMaps] = useState({
    weekIdDate: {},
    setGroupIdDate: {}
  })
  const [startDate, setStartDate] = useState(moment())
  const [showActuals, setShowActuals] = useState(false)
  const [duration, setDuration] = useState('month')
  const [field, setField] = useState('target_weight')
  const [lineChartData, setLineChartData] = useState({
    monthTarget: [],
    yearTarget: [],
    monthActual: [],
    yearActual: []
  })

  useEffect(() => {
    const {weekIdDate, setGroupIdDate} = mapSgsToDates(userRoutines)
    setDateMaps({
      ...dateMaps,
      weekIdDate,
      setGroupIdDate
    })
    setCombinedExSets(combineExSets(userRoutines))
  },[userRoutines])

  

  // Line
  useEffect(() => {
    const newLineChartData = {
      monthTarget: getMonthCalendarWeeksMuscleGroupData(combinedExSets, selectedMuscleGroups, dateMaps.weekIdDate, startDate, field, null , 'month').muscleGroupSets,
      yearTarget: getMonthCalendarWeeksMuscleGroupData(combinedExSets, selectedMuscleGroups, dateMaps.weekIdDate, startDate, field, null , 'year').muscleGroupSets,
      monthActual: getMonthCalendarWeeksMuscleGroupData(combinedExSets, selectedMuscleGroups, dateMaps.weekIdDate, startDate, field.replace('target', 'actual') , null , 'month').muscleGroupSets,
      yearActual: getMonthCalendarWeeksMuscleGroupData(combinedExSets, selectedMuscleGroups, dateMaps.weekIdDate, startDate, field.replace('target', 'actual') , null , 'year').muscleGroupSets,
    }
    setLineChartData(newLineChartData)
  }, [combinedExSets, startDate, selectedMuscleGroups, field])

  const selectDate = (e) => {
    const newMomenet = moment.utc(e.target.value)
    setStartDate(newMomenet)
    setDuration('month')
  }


  return (
    <div className='dashboard'>
      <div className="month-picker-container">
        <div className='month-picker-inner'>
          <label htmlFor="month">Your Activity:</label>
          <input 
          onChange={selectDate}
          placeholder='Choose Month'
          value={startDate.clone().format('YYYY-MM')}
          type="month" 
          id="month" 
          name="month" />
        </div>
      </div>
      <div className='visualizations-container'>
          
        <SetBreakDownTab
        combinedExSets={combinedExSets}
        weekIdDate={dateMaps.weekIdDate}
        setGroupIdDate={dateMaps.setGroupIdDate}
        startDate={startDate}
        />
        
        <MuscleGroupTotalsTab
        showActuals={showActuals}
        setShowActuals={setShowActuals}
        duration={duration}
        setDuration={setDuration}
        setField={setField}
        field={field}
        muscleGroupList={muscleGroupList}
        selectedMuscleGroups={selectedMuscleGroups}
        setSelectedMuscleGroups={setSelectedMuscleGroups}
        startDate={startDate}
        capitalizeField={capitalizeField}
        lineChartData={lineChartData}
        />
        
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
