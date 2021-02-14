import React from 'react'
import { connect } from 'react-redux'
import {setFlattenedRoutine} from '../../1_Actions/routineActions'
import {setCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {useHistory} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {PointRightIcon} from '../icons/Icons'
 

export const NoSetsModal = ({
  modalShow,
  setModalShow,
  setGroup,
  routine,
  routineName,
  setFlattenedRoutine,
  setCurrentSetGroup
}) => {

  const history = useHistory()

  const redirectLink = `/create-set-group/${routineName}/week-${setGroup.week_number}/day-${setGroup.day_number}`
  const handleAddSetsClick = () => {
    setFlattenedRoutine({routine, weeks: routine.weeks, set_groups: routine.set_groups, exercise_sets: routine.exercise_sets})
    setCurrentSetGroup(setGroup)
    history.push(redirectLink)
  }

  return (
    <Modal
    show={modalShow}
    onHide={() => setModalShow({
      setGroup: '',
      routine: '',
      routineName: ''
    })}
    size='lg'
    centered
    className='no-sets-modal'>
      <Modal.Header
      closeButton>
        <Modal.Title>No Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have not created any exercise sets for this set group</p>
        <Button
        onClick={handleAddSetsClick}
        className='create-sets-btn'>
          Create Exercise Sets&nbsp;<PointRightIcon />
        </Button>
      </Modal.Body>

    </Modal>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  setFlattenedRoutine,
  setCurrentSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(NoSetsModal)
