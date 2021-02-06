import React, {useState} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customStyles } from './helpers/selectStyles'

const MuscleGroupSelector = ({
  muscleGroupList,
  setSelectedMuscleGroups,
  selectedMuscleGroups
}) => {

  const selectOptions = muscleGroupList.map(groupObj => ({ label: groupObj.name, value: groupObj.name }))
  selectOptions.unshift({label: 'All', value: 'All'})
  
  const selectedValues = selectedMuscleGroups.map(groupObj => ({label: groupObj.name, value: groupObj.name}))
  const animatedComponents = makeAnimated()

  const handleGroupSelect = (newSelections) => {

    console.log({newSelections})
    if(!newSelections){
      return setSelectedMuscleGroups([])
    }
    if(newSelections.find(selection => selection.value === 'All')){
      return setSelectedMuscleGroups(muscleGroupList)
    }

    const newSelectedGroups = []
    newSelections && newSelections.forEach(selection => {
      newSelectedGroups.push(muscleGroupList.find(groupObj => groupObj.name === selection.value))
    })
    setSelectedMuscleGroups(newSelectedGroups)
    
  }

  return (
    <div className='select-container'>
      <Select
      value={selectedValues}
      components={animatedComponents}
      styles={customStyles()}
      placeholder='Select Muscle Groups...'
      onChange={handleGroupSelect}
      options={selectOptions}
      isMulti
      autoFocus
      isSearchable/>
    </div>
  )
}

export default MuscleGroupSelector
