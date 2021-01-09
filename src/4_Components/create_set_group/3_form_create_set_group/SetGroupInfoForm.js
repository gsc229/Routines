import React from 'react'
import { connect } from 'react-redux'
import DropSetForm from './DropSetForm'
import StraightSetForm from './StraightSetForm'


export const SetGroupInfoForm = ({
  currentSetGroup
}) => {

  const {set_group_type} = currentSetGroup

  const getForm = () => {
    switch(set_group_type){
      case "Drop":
        return <DropSetForm />
      case "Straight":
        return <StraightSetForm />
      default:
        return <StraightSetForm />
    }
  }





  return (
    getForm()
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupInfoForm)
