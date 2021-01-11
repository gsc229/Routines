import React, {useState} from 'react'
import { connect } from 'react-redux'
import {bulkWriteCurrentExerciseSets} from '../../../1_Actions/exerciseSetActions'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import TargetsSetter from '../../create_set_group/3_targets_and_subgroups/TargetsSetter'

export const EditSetModal = ({
  modalShow,
  setModalShow,
  currentExerciseSet,
  currentExerciseSets,
  bulkWriteCurrentExerciseSets,
  index
}) => {

  const [alertShow, setAlertShow] = useState(false)

  const {exercise} = currentExerciseSet

  const confirmClose = () => {
    setAlertShow(true)
  }

  const colseConfirmed = () => {
    setModalShow(false)
    setAlertShow(false)
  }

  const conFirmCloseAlert = () => {
    return(
      <Alert
      className='modal-alert'
      variant='danger'
      show={alertShow} >
        <Alert.Heading>
          Are you sure you want close?
        </Alert.Heading>
      </Alert>
    )
  }

  const handleFinishedEditing = () => {
    const setsCopy = [...currentExerciseSets]
    setsCopy.splice(index, 1, currentExerciseSet)
    bulkWriteCurrentExerciseSets(setsCopy)
    setModalShow(false)
  }

  return (
    <Modal
    className='edit-set-modal'
    show={modalShow}
    onHide={confirmClose}
    size='lg'
    aria-labelledby={`set-${exercise._id}`}
    centered>

      <Modal.Header
      closeButton={!alertShow}>
        Set Name: {currentExerciseSet.name || "No Name"}<br/>
        Exercise Name: {exercise.name || "No Name"}
      </Modal.Header>

      {alertShow && 
      <Modal.Body className='modal-body-alert' >
          {conFirmCloseAlert()}
        <div className='continue-close-btns'>
          <Button className='continue-btn' variant='success' onClick={() => setAlertShow(false)}>Continue Working</Button> 
          <Button className='close-btn' onClick={colseConfirmed}>Close</Button>
        </div>
      </Modal.Body>}

      {!alertShow && 
      <Modal.Body className='modal-body-normal'>
        <TargetsSetter />
        
      </Modal.Body>}
      <Modal.Footer>
        <Button
          className='done-setting-targets-btn'
          onClick={handleFinishedEditing}>
          Done
        </Button>
      </Modal.Footer>
      

    </Modal>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  bulkWriteCurrentExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSetModal)
