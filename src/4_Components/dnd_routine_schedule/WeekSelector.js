import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import {customStyles} from './schedule_helpers/selectStyles'
import makeAnimated from 'react-select/animated'



export const WeekSelector = ({
  setSelectedWeekNumbers,
  currentRoutine,
  currentWeeks
}) => {

  const [selectOptions, setSelectOptions] = useState([])
  const [selectedValues, setSelectedValues] = useState('')
  const animatedComponents = makeAnimated()

  useEffect(() => {
    const newSelectOptions = [{label: 'All', value: 'all'}] 
    currentWeeks.forEach(week => newSelectOptions.push({label: `Week: ${week.week_number}`, value: week.week_number}))
    setSelectOptions(newSelectOptions)

  }, [currentWeeks])

  

  const handleWeekSelect = (newSelections) => {

    if(newSelections === null){
      setSelectedValues('')
      return setSelectedWeekNumbers(['all'])
    }

    if(newSelections.includes('all')){
      setSelectedValues([{label: 'All', value: 'all'}])
    } else{
      setSelectedValues(newSelections.sort((aV, bV) => aV.value - bV.value))
    }
    
    newSelections = Array.isArray(newSelections) ? newSelections : [newSelections]

    const updatedWeekNums = newSelections.map( selection => selection.value)
    setSelectedWeekNumbers(updatedWeekNums)


  }

  return (
    <div 
    className='select-container'>
      <Select
      value={selectedValues}
      components={animatedComponents}
      styles={customStyles(currentRoutine.color)}
      placeholder='Filter weeks...'
      onChange={handleWeekSelect}
      options={selectOptions}
      isMulti
      autoFocus
      isSearchable/>
    </div>
  )
}

const mapStateToProps = (state) => ({
 currentRoutine: state.routineReducer.currentRoutine 
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelector)
