import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import mapSgsToDates from '../calendar/mapRoutinesToDates'
import { combineExSets } from './helpers/combineExSets'
import { getMonthCalendarWeeksMuscleGroupData } from './helpers/getMonthCalendarWeeksMuscleGroupData'
import ExercisePies from './ExercisePies'
import LineChart from '../line_chart/LineChart'
import MucleGroupSelector from './MuscleGroupSelector'
import {exercisePieDataFromSetGroups} from './helpers/exercisePieDataFromSetGroups'
import Form from 'react-bootstrap/Form'


export const Dashboard = ({
  userRoutines  
}) => {

  const muscleGroupList = [{name: "Chest"}, {name: "Back"} , {name: "Abs"}, {name: "Arms"}, {name: "Shoulders"}, {name: "Legs"}, {name: "Calves"}, {name: "Full Body"}]
  const capitalizeField = (field) => {
    return field.split('_').map(word => word[0].toUpperCase() + word.slice(1, word.length)).join(" ")
  }
  
  const [pieData, setPieData] = useState({
    exerciseNameExSetCount: {},
    muscleGroupCount: {},
    duration: 'month'
  })
  const [combinedExSets, setCombinedExSets] = useState([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(muscleGroupList)
  const [weekIdDate, setWeekIdDate] = useState({})
  const [startDate, setStartDate] = useState(moment())
  const [field, setField] = useState('target_weight')
  const [lineCharData, setLineCharData] = useState([])

  useEffect(() => {
    const {weekIdDate} = mapSgsToDates(userRoutines)
   
    setWeekIdDate(weekIdDate)
    setCombinedExSets(combineExSets(userRoutines))
  },[userRoutines])

  
  useEffect(() => {
    const newLineChartData = getMonthCalendarWeeksMuscleGroupData(combinedExSets, selectedMuscleGroups, weekIdDate, startDate, field).muscleGroupSets
    setLineCharData(newLineChartData)
  }, [combinedExSets, selectedMuscleGroups, weekIdDate, startDate, field])

  useEffect(() => {
    const {exerciseNameExSetCount, muscleGroupCount} = exercisePieDataFromSetGroups(combinedExSets, weekIdDate, startDate, pieData.duration)
    setPieData({...pieData, exerciseNameExSetCount, muscleGroupCount})
  }, [pieData.duration, startDate, combinedExSets])

  const selectDate = (e) => {
    const newMomenet = moment.utc(e.target.value)
    setStartDate(newMomenet)
  }

  const handleAllTimePieClick = (e) => {
    setPieData({...pieData, duration: e.target.name})
  }


  return (
    <div className='dashboard'>
      <div className="month-picker-container">
        <label htmlFor="month">Your Activity:</label>
        <input 
        onChange={selectDate}
        checked={pieData.duration==='year'}
        placeholder='Choose Month'
        value={startDate.clone().format('YYYY-MM')}
        type="month" id="month" name="month" />
      </div>
      <div className='visualizations-container'>

        <div className="ex-pies-and-checkbox">
          <Form className='all-time-checkbox-form'>
            <div className='form-group-container'>
              <h6>Pie Chat Data For:</h6>
              <Form.Group>
                <Form.Check
                label='Year'
                onClick={handleAllTimePieClick}
                checked={pieData.duration==='year'}
                name='year'
                value='year'
                type='radio' 
                />
                <Form.Check
                label='Month'
                onClick={handleAllTimePieClick}
                checked={pieData.duration==='month'}
                name='month'
                value='month'
                type="radio"
                />
            </Form.Group>
            </div>
          </Form>
          <ExercisePies exerciseNameExSetCount={pieData.exerciseNameExSetCount} muscleGroupCount={pieData.muscleGroupCount} />
        </div>

        <div className='line-chart-and-selector'>
          <MucleGroupSelector 
          muscleGroupList={muscleGroupList}
          selectedMuscleGroups={selectedMuscleGroups} 
          setSelectedMuscleGroups={setSelectedMuscleGroups} />
          <LineChart 
          axisTitle={`Total ${capitalizeField(field)}`}
          data={lineCharData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
