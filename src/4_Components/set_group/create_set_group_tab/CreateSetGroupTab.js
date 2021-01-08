import React from 'react'
import { connect } from 'react-redux'
import SgNameInputForm from './SgNameInputForm'
import SelectTypeTabs from './SelectTypeTabs'


export const CreateSetGroupTab = ({
  currentStep
}) => {
  return (
    <div className='create-set-group-tab'>
      <SgNameInputForm />
      <p className='quick-build-heading'>Quick Build: </p>
      <SelectTypeTabs />
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSetGroupTab)
