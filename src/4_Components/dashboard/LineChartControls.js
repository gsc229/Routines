import React from 'react'
import TargetSelector from '../create_set_group/3_targets_and_subgroups/TargetsSetter'
import MuscleGroupSelector from './MuscleGroupSelector'
import LineChartChecboxes from './LineChartChecboxes'

const LineChartControls = ({
  setField,
  field,
  showActuals, 
  setShowActuals,
  muscleGroupList,
  selectedMuscleGroups,
  setSelectedMuscleGroups,
  duration, 
  setDuration
}) => {
  return (
    <div className='line-chart-controls'>
      <div className='target-selector-container'>
        <TargetSelector 
        onSelect={e => setField(e)} 
        showInput={false} />
      </div>
      <MuscleGroupSelector 
      muscleGroupList={muscleGroupList}
      selectedMuscleGroups={selectedMuscleGroups} 
      setSelectedMuscleGroups={setSelectedMuscleGroups} />
      <LineChartChecboxes 
      showActuals={showActuals} 
      setShowActuals={setShowActuals} 
      duration={duration} 
      setDuration={setDuration} />
    </div>
  )
}

export default LineChartControls
