import React, {useState, useEffect, useRef} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { customStyles } from './helpers/selectStyles'

const MuscleGroupSelector = ({
  muscleGroupList,
  setSelectedMuscleGroups,
  selectedMuscleGroups
}) => {
  const animatedComponents = makeAnimated()
  const [selectOptions, setSelectOptions] = useState([])
  const [selectedValues, setSelectedValues] = useState([])

  useEffect(() => {

    const newSelectOptions = muscleGroupList.map(groupObj => ({ label: groupObj.name, value: groupObj.name, selectedColor: groupObj.color }))
    newSelectOptions.unshift({label: "All", value: "All"})
    setSelectOptions(newSelectOptions)

    const newSelecedValues = selectedMuscleGroups && selectedMuscleGroups.map(groupObj => ({label: groupObj.name, value: groupObj.name, selectedColor: groupObj.color }))
    setSelectedValues(newSelecedValues)
    

  }, [selectedMuscleGroups, setSelectedMuscleGroups])

  
  
  

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
      value={selectedValues}
      components={animatedComponents}
      styles={customStyles()}
      placeholder='Select Muscle Groups...'
      onChange={handleGroupSelect}
      options={selectOptions}
      isMulti
      closeMenuOnSelect={true}
      autoFocus/>
    </div>
  )
}

export default MuscleGroupSelector
