import React from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'
import {FaRegHandPointLeft} from 'react-icons/fa'

export const PreviewSetGroup = ({
  writingCreateSetGroupData
}) => {
  return (
    <div>
      <h1>Preview Set Group</h1>
      <Button 
      onClick={() => writingCreateSetGroupData('currentStep', 'choose-exercise')}>
        <FaRegHandPointLeft />&nbsp;
        Go back to choose exercises
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSetGroup)
