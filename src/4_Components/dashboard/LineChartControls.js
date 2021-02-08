import React from 'react'
import TargetSelector from '../create_set_group/3_targets_and_subgroups/TargetsSetter'
import MuscleGroupSelector from './MuscleGroupSelector'

const LineChartControls = ({
  setField,
  muscleGroupList,
  selectedMuscleGroups,
  setSelectedMuscleGroups
}) => {
  return (
    <div className='line-chart-controls'>
      <TargetSelector 
      onSelect={e => setField(e)} 
      showInput={false} />
      <MuscleGroupSelector 
      muscleGroupList={muscleGroupList}
      selectedMuscleGroups={selectedMuscleGroups} 
      setSelectedMuscleGroups={setSelectedMuscleGroups} />
    </div>
  )
}

export default LineChartControls
