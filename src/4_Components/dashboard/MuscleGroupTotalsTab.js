import React from 'react'
import LineChartControls from './LineChartControls'
import LineChart from '../line_chart/LineChart'

const MuscleGroupTotalsTab = ({
  showActuals,
  setShowActuals,
  duration,
  setDuration,
  setField,
  field,
  muscleGroupList,
  selectedMuscleGroups,
  setSelectedMuscleGroups,
  startDate,
  capitalizeField,
  lineChartData
}) => {

  const getLineChart = () => {
    const bottomTickValueFreq = {
      month: 'every week',
      year: 'every 4 weeks'
    }

    if(showActuals && duration === 'month'){
      return (
        <LineChart
        bottomTickValueFreq={bottomTickValueFreq[duration]}
        axisTitle={`Total ${capitalizeField(field).replace('Target', `${showActuals ? 'Actual' : 'Target'}`)}`}
        data={lineChartData.monthActual} />
      )
    }

    if(showActuals && duration === 'year'){
      return (
        <LineChart
        bottomTickValueFreq={bottomTickValueFreq[duration]}
        axisTitle={`Total ${capitalizeField(field).replace('Target', `${showActuals ? 'Actual' : 'Target'}`)}`}
        data={lineChartData.yearActual} />
      )
    }

    if(!showActuals && duration === 'month'){
      return (
        <LineChart
        bottomTickValueFreq={bottomTickValueFreq[duration]}
        axisTitle={`Total ${capitalizeField(field).replace('Target', `${showActuals ? 'Actual' : 'Target'}`)}`}
        data={lineChartData.monthTarget} />
      )
    }

    if(!showActuals && duration === 'year'){
      return (
        <LineChart
        bottomTickValueFreq={bottomTickValueFreq[duration]}
        axisTitle={`Total ${capitalizeField(field).replace('Target', `${showActuals ? 'Actual' : 'Target'}`)}`}
        data={lineChartData.yearTarget} />
      )
    }
  }



  return (
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
      {getLineChart()}
    </div>
  )
}

export default MuscleGroupTotalsTab
