import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {IoDuplicateOutline} from 'react-icons/io5'
import {BsEye} from 'react-icons/bs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'

export const SetGroup = ({set_group, isDragging}) => {

  return (
    <Card
    text={!isDragging && 'white'}
    style={{margin: '5px auto', cursor: 'grab'}}
    className="set-group-schedule-card">
      <Card.Header
      className='set-group-schedule-card-header'>
        <div className='set-group-schedule-card-btns-container'>
        <OverlayTrigger overlay={<ToolTip>View full details</ToolTip>}>
          <BsEye
          onClick={() => alert(JSON.stringify(set_group, null, 2))} 
          style={{marginRight: '10px', cursor: 'pointer'}} 
          />
        </OverlayTrigger>

        <OverlayTrigger overlay={<ToolTip>Duplicate this set group</ToolTip>}>
          <IoDuplicateOutline
            style={{cursor: 'pointer', marginRight: '10px'}}
          />
        </OverlayTrigger>
  
        <BsGrid3X3Gap />
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
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroup)
