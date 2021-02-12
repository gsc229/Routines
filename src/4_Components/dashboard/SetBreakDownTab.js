import React, {useState, useEffect} from 'react'
import {exercisePieDataFromSetGroups} from './helpers/exercisePieDataFromSetGroups'
import ExercisePies from './ExercisePies'
import Form from 'react-bootstrap/Form'
import {muscleGroupList, muscleGroupColorObj} from './helpers/muscleGroupNameAndColorList'
import { duration } from 'moment'


const SetBreakDownTab = ({
  combinedExSets,
  weekIdDate,
  startDate
}) => {

  const [pieData, setPieData] = useState({
    exerciseNameMuscleGroupColor: {},
    exerciseNameExSetCount: {},
    muscleGroupCount: {},
    duration: 'year'
  })

  // Pie
  useEffect(() => {
    const {exerciseNameExSetCount, muscleGroupCount, exerciseNameMuscleGroupColor} = 
    exercisePieDataFromSetGroups(combinedExSets, weekIdDate, startDate, pieData.duration, muscleGroupColorObj)
    setPieData({...pieData, exerciseNameExSetCount, muscleGroupCount, exerciseNameMuscleGroupColor})
  }, [pieData.duration, startDate, combinedExSets])


  const handleAllTimePieClick = (e) => {
    setPieData({...pieData, duration: e.target.name})
  }




  return (
    <div className="ex-pies-and-checkbox">
          <pre style={{color: 'white'}}>{JSON.stringify({weekIdDate}, null, 2)}</pre>
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
                label={startDate.clone().format('MMMM')}
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
  )
}

export default SetBreakDownTab



