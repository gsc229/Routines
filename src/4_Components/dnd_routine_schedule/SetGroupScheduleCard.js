import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {destroySetGroup} from '../../1_Actions/setGroupActions'
import {} from '../../'
import Card from 'react-bootstrap/Card'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import {RiDeleteBin5Line} from 'react-icons/ri'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import DuplicateHereBtn from './DuplicateHereBtn'


export const SetGroup = ({
  set_group, 
  isDragging,
  destroySetGroup,
  currentWeeks
}) => {


  


  const handleDeleteSetGroup = () => {
    destroySetGroup(set_group._id)
  }

  return (
    <Card
    text={!isDragging && 'white'}
    style={{margin: '5px auto', cursor: 'grab'}}
    className="set-group-schedule-card">
      <Card.Header
      className='set-group-schedule-card-header'>
        <div className='view-copy-move-btns-conainer'>
        <OverlayTrigger overlay={<ToolTip>View full details</ToolTip>}>
          <BsEye
          onClick={() => alert(JSON.stringify(set_group, null, 2))} 
          style={{marginRight: '10px', cursor: 'pointer'}} 
          />
        </OverlayTrigger>
        <DuplicateHereBtn 
        set_group={set_group}/>
  
        <BsGrid3X3Gap />
      </div>
      <p style={{fontSize: '12px'}}>
        SG Week#{set_group.week_number} <br/> 
        weekID: {set_group.week} <br/>
        weekNumber: {currentWeeks.find(week => week._id === set_group.week).week_number}<br/>
        weekIndex + 1: {currentWeeks.map(week => week._id).indexOf(set_group.week) + 1}
      </p>
      <div className="delete-btn-container">

        <OverlayTrigger overlay={<ToolTip>Delete set group</ToolTip>}>
          <RiDeleteBin5Line 
          onClick={handleDeleteSetGroup}
          className='delete-icon'/>
        </OverlayTrigger>

      </div>
      </Card.Header>
      <Card.Body
        className='set-group-schedule-card-body'
      >
        <Card.Subtitle>{set_group.name ? set_group.name : 'no name'}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  currentWeeks: state.weekReducer.currentWeeks
})

const mapDispatchToProps = {
  destroySetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroup)
