import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {clearExerciseSearchResults} from '../../../1_Actions/exerciseActions'
import SgNameInputForm from './SgNameInputForm'
import SelectTypeTabs from './SelectTypeTabs'
import CreateSetGroupSteps from '../create_set_group_steps/CreateSetGroupSteps'

export const CreateSetGroupTab = ({
  currentStep,
  clearExerciseSearchResults
}) => {

  useEffect(() => {
    clearExerciseSearchResults()
  }, [])


  return (
    <div className='create-set-group-tab'>
      <SgNameInputForm />
      <p className='quick-build-heading'>Quick Build: </p>
      <SelectTypeTabs />
      <CreateSetGroupSteps />
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  clearExerciseSearchResults
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupTab)
