import React, {useState} from 'react'
import { connect } from 'react-redux'
import {setCurrentSetGroup, setCurrentSetGroups} from '../../1_Actions/setGroupActions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import ViewSetGroupModal from '../modals/view_modals/ViewSetGroupModal'

export const DaySection = ({
  dateSetGroups,
  routineNamesColors,
  setCurrentSetGroup
}) => {

  const [modalShow, setModalShow] = useState(false)
  const handleClick = (sg) => {
    setModalShow(true)
    setCurrentSetGroup(sg)
  }

  return (
    <div className='day-sections'>
      
      {dateSetGroups && dateSetGroups.sort((a, b) => a.routine - b.routine).map(sg => {
        return(
          <div 
          key={sg._id}
          className='day-section-wrapper'>
            <ViewSetGroupModal 
            redirectLink={`/create-set-group/${routineNamesColors[sg.routine].name }/${sg.week_number}/day-${sg.day_number}-${sg.day}`}
            setModalShow={setModalShow} 
            modalShow={modalShow} />
            <OverlayTrigger 
            overlay={
            <ToolTip>
              <div 
              style={{color: routineNamesColors[sg.routine].color, fontWeight: 'bold'}}
              className='tool-tip-title'>
                {routineNamesColors[sg.routine].name + ':'}
              </div>{sg.name}
            </ToolTip>}>
              <div
                onClick={() => handleClick(sg)}
                className='day-marker'
                style={{backgroundColor: routineNamesColors[sg.routine].color}}>
              </div>
            </OverlayTrigger>
          </div>
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
