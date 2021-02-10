import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import mapSgsToDates from '../calendar/mapRoutinesToDates'
import { combineExSets } from './helpers/combineExSets'
import { getMonthCalendarWeeksMuscleGroupData } from './helpers/getMonthCalendarWeeksMuscleGroupData'
import ExercisePies from './ExercisePies'
import LineChart from '../line_chart/LineChart'
import {exercisePieDataFromSetGroups} from './helpers/exercisePieDataFromSetGroups'
import {muscleGroupList, muscleGroupColorObj} from './helpers/muscleGroupNameAndColorList'
import Form from 'react-bootstrap/Form'
import LineChartControls from './LineChartControls'

export const Dashboard = ({
  userRoutines  
}) => {

  const capitalizeField = (field) => {
    return field.split('_').map(word => word[0].toUpperCase() + word.slice(1, word.length)).join(" ")
  }
  
  const [pieData, setPieData] = useState({
    exerciseNameMuscleGroupColor: {},
    exerciseNameExSetCount: {},
    muscleGroupCount: {},
    duration: 'year'
  })
  const [combinedExSets, setCombinedExSets] = useState([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(muscleGroupList)
  const [weekIdDate, setWeekIdDate] = useState({})
  const [startDate, setStartDate] = useState(moment())
  const [showActuals, setShowActuals] = useState(false)
  const [ duration, setDuration ] = useState('month')
  const [field, setField] = useState('target_weight')
  const [lineCharData, setLineCharData] = useState([])

  useEffect(() => {
    const {weekIdDate} = mapSgsToDates(userRoutines)
    setWeekIdDate(weekIdDate)
    setCombinedExSets(combineExSets(userRoutines))
  },[userRoutines])

  // Pie
  useEffect(() => {
    const {exerciseNameExSetCount, muscleGroupCount, exerciseNameMuscleGroupColor} = 
    exercisePieDataFromSetGroups(combinedExSets, weekIdDate, startDate, pieData.duration, muscleGroupColorObj)
    setPieData({...pieData, exerciseNameExSetCount, muscleGroupCount, exerciseNameMuscleGroupColor})
  }, [pieData.duration, startDate, combinedExSets])

  // Line
  useEffect(() => {
    const targetOrActualField = showActuals ? field.replace('target', 'actual') : field
    const newLineChartData = 
    getMonthCalendarWeeksMuscleGroupData(combinedExSets, selectedMuscleGroups, weekIdDate, startDate, targetOrActualField, null , duration).muscleGroupSets
    setLineCharData(newLineChartData)
  }, [combinedExSets, selectedMuscleGroups, weekIdDate, startDate, field, duration, showActuals])

  const selectDate = (e) => {
    const newMomenet = moment.utc(e.target.value)
    setStartDate(newMomenet)
    setDuration('month')
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
          <ExercisePies
          exerciseNameMuscleGroupColor={pieData.exerciseNameMuscleGroupColor}
          exerciseNameExSetCount={pieData.exerciseNameExSetCount} 
          muscleGroupCount={pieData.muscleGroupCount} />
        </div>

        <div 
        className='line-chart-and-controls'>
          <h3 className='weekly-totals-header'>Weekly Totals: </h3>
          <LineChartControls 
          showActuals={showActuals}
          setShowActuals={setShowActuals}
          duration={duration}
          setDuration={setDuration}
          setField={setField}
          field={field}
          muscleGroupList={muscleGroupList}
          setSelectedMuscleGroups={setSelectedMuscleGroups}
          selectedMuscleGroups={selectedMuscleGroups} />
          <h6 className='line-chart-heading'>
            Weekly&nbsp;
            Totals - &nbsp;
            <span style={{color: showActuals ? 'lightgreen' : 'red', fontWeight: 'bold'}}>{capitalizeField(field).replace('Target', `${showActuals ? 'Actual' : 'Target'}`)} </span>
            - 
            &nbsp;
            {duration === 'month' ? startDate.clone().format('MMMM YYYY') : startDate.clone().format('YYYY')}
          </h6>
          <LineChart 
          axisTitle={`Total ${capitalizeField(field).replace('Target', `${showActuals ? 'Actual' : 'Target'}`)}`}
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
