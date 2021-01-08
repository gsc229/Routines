import React from 'react'
import { connect } from 'react-redux'
import DropSetForm from './DropSetForm'
import StraightSetForm from './StraightSetForm'


export const SetGroupInfoForm = ({
  currentSetGroup
}) => {

  const {set_group_type} = currentSetGroup

  const form = {
    "Drop": <DropSetForm />,
    "Straight": <StraightSetForm />
  }




  return (
    form[set_group_type]
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReduer.currentSetGroup
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupInfoForm)
