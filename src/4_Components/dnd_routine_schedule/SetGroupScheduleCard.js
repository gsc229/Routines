import React, {useState} from 'react'
import { connect } from 'react-redux'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import Card from 'react-bootstrap/Card'
import {BsGrid3X3Gap, BsEye} from 'react-icons/bs'
import {RiDeleteBin5Line} from 'react-icons/ri'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import DuplicateHereBtn from './DuplicateHereBtn'
import DuplicateTo from './DuplicateTo'
import ViewSetGroupModal from '../modals/view_modals/ViewSetGroupModal'
import ConfirmDeleteModal from '../modals/confirm_delete_modals/ConfirmDeleteSetGroupModal'

export const SetGroup = ({
  set_group, 
  weekNumber,
  dayNumber,
  isDragging,
  setCurrentSetGroup,
  currentRoutine
}) => {

  const [modalShow, setModalShow] = useState(false)
  const [deletaModalShow, setDeleteModalShow] = useState(false)
  const redirectLink = `/create-set-group/${currentRoutine.slug ? currentRoutine.slug : currentRoutine.name.replace(/[\s]/g, '')}/week-${weekNumber}/day-${dayNumber}}`

  const handleViewSetGroup = () => {
    setCurrentSetGroup(set_group)
    setModalShow(true)
  }

  return (
    <Card
    style={{border: `2px solid ${currentRoutine.color || 'var(--routine-red)'}` }}
    text={!isDragging && 'white'}
    className="set-group-schedule-card">
      {modalShow && 
      
      <ViewSetGroupModal
      redirectLink={redirectLink}
      setModalShow={setModalShow} 
      modalShow={modalShow}/>}
      
      <ConfirmDeleteModal  
      setGroup={set_group}
      modalShow={deletaModalShow}
      setModalShow={setDeleteModalShow}
      />
      <Card.Header
      style={{backgroundColor: isDragging ? currentRoutine.color || 'white' : 'var(--jet)'}}
      className='set-group-schedule-card-header'>

        <div className='view-copy-move-btns-conainer'>
          <div className='view-duplicate-here-to'>

            <div className='view-here-container'>

              <div
              className='schedule-card-control-btn'>
                <OverlayTrigger 
                overlay={<ToolTip>View full details</ToolTip>}>
                <BsEye
                onClick={handleViewSetGroup} />
                </OverlayTrigger>
              </div>
    
              <div
              className='schedule-card-control-btn'>
                <OverlayTrigger overlay={<ToolTip>Duplicate here</ToolTip>}>
                  <DuplicateHereBtn
                  set_group={set_group}/>
                </OverlayTrigger>
              </div>
            </div>

            <div className='duplicate-to-container'>
              <DuplicateTo
              set_group={set_group}
              className='schedule-card-control-btn duplicate-to' />
            </div>

          </div>

          <div className='grabber-container'>
            <BsGrid3X3Gap
            className='schedule-card-control-btn schedule-card-grabber' />
          </div>
         
        </div>

      </Card.Header>
      <Card.Body
      className='set-group-schedule-card-body'>
        <Card.Subtitle>{set_group.name ? set_group.name : 'no name'}</Card.Subtitle>
        <OverlayTrigger 
        overlay={<ToolTip>Delete set group</ToolTip>}>
          <RiDeleteBin5Line
          className='schedule-card-control-btn set-group-card-delete-icon' 
          onClick={() => setDeleteModalShow(true)}
          />
        </OverlayTrigger>
      </Card.Body>
    </Card>
    
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  setCurrentSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroup)
