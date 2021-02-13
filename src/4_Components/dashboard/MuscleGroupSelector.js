import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customStyles } from './helpers/selectStyles'

const MuscleGroupSelector = ({
  muscleGroupList,
  setSelectedMuscleGroups,
  selectedMuscleGroups
}) => {
  const animatedComponents = makeAnimated()
  const selectOptions = muscleGroupList.map(groupObj => ({ label: groupObj.name, value: groupObj.name, selectedColor: groupObj.color }))
  selectOptions.unshift({label: 'All', value: 'All'})

  
  
  const selectedValues =  selectedMuscleGroups && selectedMuscleGroups.map(groupObj => ({label: groupObj.name, value: groupObj.name, selectedColor: groupObj.color }))

  

  const handleGroupSelect = (newSelections) => {
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
      value={[...selectedValues]}
      components={animatedComponents}
      styles={customStyles()}
      placeholder='Select Muscle Groups...'
      onChange={handleGroupSelect}
      options={selectOptions}
      isMulti
      isSearchable={false}
      closeMenuOnSelect={true}
      autoFocus/>
    </div>
  )
}

export default MuscleGroupSelector
