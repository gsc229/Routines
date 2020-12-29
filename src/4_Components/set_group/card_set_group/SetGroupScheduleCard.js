import React from 'react'
import { connect } from 'react-redux'
import {getExSetTarget} from './setGroupHelpers'
import Card from 'react-bootstrap/Card'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {IoDuplicateOutline} from 'react-icons/io5'
import {BsEye} from 'react-icons/bs'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'

export const SetGroup = ({set_group, isDragging}) => {

  return (
    <Card
    bg={!isDragging &&  'primary'}
    text={!isDragging && 'white'}
    style={{margin: '5px auto', cursor: 'grab'}}
    className={`set-group-schedule-card`}>
    <div 
    style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',  
      width: '95%', 
      margin: 'auto',
      }}>
      <p style={{position: 'relative', top: '7px' }} >{set_group.name ? set_group.name : 'no name'} --- TO DO: Add the number of sets</p>

      <div>
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
    </div>

      
    </Card>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroup)
