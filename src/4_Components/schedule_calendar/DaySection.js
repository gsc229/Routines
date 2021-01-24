import React, {useState} from 'react'
import { connect } from 'react-redux'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import ViewSetGroupModal from '../modals/view_modals/ViewSetGroupModal'

export const DaySection = ({
  dateSetGroups,
  routineNamesColors,
  setCurrentSetGroup
}) => {

  console.log({dateSetGroups})

  const [modalShow, setModalShow] = useState(false)
  const handleClick = (sg) => {
    setModalShow(true)
    setCurrentSetGroup(sg)
  }

  const viewSetGroupModal = (sg) => {
    <ViewSetGroupModal 
    redirectLink={`/create-set-group/${routineNamesColors[sg.routine].name }/${sg.week_number}/day-${sg.day_number}-${sg.day}`}
    setModalShow={setModalShow} 
    modalShow={modalShow} />
  }

  return (
    <div className='day-sections'>
      
      {dateSetGroups && dateSetGroups.sort((a, b) => a.routine - b.routine).map(sg => {
        return(
          <>
            <ViewSetGroupModal 
            redirectLink={`/create-set-group/${routineNamesColors[sg.routine].name }/${sg.week_number}/day-${sg.day_number}-${sg.day}`}
            setModalShow={setModalShow} 
            modalShow={modalShow} />
            <OverlayTrigger overlay={<ToolTip>{routineNamesColors[sg.routine].name + ':'} <br/> {sg.name}</ToolTip>}>
              <div
                onClick={() => handleClick(sg)}
                className='day-section'
                style={{backgroundColor: routineNamesColors[sg.routine].color}}>
              </div>
            </OverlayTrigger>
          </>
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
