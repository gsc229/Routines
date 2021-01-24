import React, {useState} from 'react'
import { connect } from 'react-redux'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import ViewSetGroupModa from '../modals/view_modals/ViewSetGroupModal'

export const DaySection = ({
  dateSetGroups,
  routineColors,
  setCurrentSetGroup
}) => {

  console.log({dateSetGroups})

  const [modalShow, setModalShow] = useState(false)
  const handleClick = (sg) => {
    setModalShow(true)
    setCurrentSetGroup(sg)
  }
  return (
    <div className='day-sections'>
      <ViewSetGroupModa setModalShow={setModalShow} modalShow={modalShow} />
      {dateSetGroups && dateSetGroups.sort((a, b) => a.routine - b.routine).map(sg => {
        return(
          <OverlayTrigger overlay={<ToolTip>{sg.name}</ToolTip>}>
            <div
            onClick={() => handleClick(sg)}
            className='day-section'
            style={{backgroundColor: routineColors[sg.routine]}}>
            </div>
          </OverlayTrigger>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  setCurrentSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(DaySection)
