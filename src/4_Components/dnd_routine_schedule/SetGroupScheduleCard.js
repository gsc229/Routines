import React, {useState} from 'react'
import { connect } from 'react-redux'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {numberToDay} from '../../4_Components/dnd_routine_schedule/schedule_helpers/routineScheduleConstructor'
import Card from 'react-bootstrap/Card'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
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

  console.log({dayNumber})
  const [modalShow, setModalShow] = useState(false)
  const [deletaModalShow, setDeleteModalShow] = useState(false)
  const redirectLink = `/create-set-group/${currentRoutine.slug ? currentRoutine.slug : currentRoutine.name}/week-${weekNumber}/day-${dayNumber}}`
  
  

  const handleViewSetGroup = () => {
    setCurrentSetGroup(set_group)
    setModalShow(true)
  }

  return (
    <Card
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
      className='set-group-schedule-card-header'>

        <div className='view-copy-move-btns-conainer'>
          <OverlayTrigger 
          overlay={<ToolTip>View full details</ToolTip>}>
          <BsEye
          className='schedul-card-control-btn'
          onClick={handleViewSetGroup} 
          />
          </OverlayTrigger>

          <OverlayTrigger overlay={<ToolTip>Duplicate here</ToolTip>}>
          <div 
          className='schedul-card-control-btn' >
            <DuplicateHereBtn
            set_group={set_group}/>
          </div>
          </OverlayTrigger>
          
          <DuplicateTo
          set_group={set_group}
          className='schedul-card-control-btn' />

          <BsGrid3X3Gap
          id='schedule-card-grabber-icon'
          className='schedul-card-control-btn' />

          

        </div>

      </Card.Header>
      <Card.Body
        className='set-group-schedule-card-body'>
        <Card.Subtitle>{set_group.name ? set_group.name : 'no name'}</Card.Subtitle>
        <OverlayTrigger 
        overlay={<ToolTip>Delete set group</ToolTip>}>
          <RiDeleteBin5Line
          className='schedul-card-control-btn' 
          onClick={() => setDeleteModalShow(true)}
          id='set-group-card-delete-icon'/>
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
