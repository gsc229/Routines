import React, {useState} from 'react'
import { connect } from 'react-redux'
import {bulkWriteCurrentExerciseSets, clearCurrentExerciseSet} from '../../../1_Actions/exerciseSetActions'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import TargetsSetter from '../../create_set_group/3_targets_and_subgroups/TargetsSetter'

export const SetTargetsModal = ({
  modalShow,
  setModalShow,
  currentExerciseSet,
  currentExerciseSets,
  bulkWriteCurrentExerciseSets,
  clearCurrentExerciseSet,
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

  const handleFinishedSettingTargets = () => {
    const setsCopy = [...currentExerciseSets]
    setsCopy.splice(index, 1, currentExerciseSet)
    bulkWriteCurrentExerciseSets(setsCopy)
    setModalShow(false)
    clearCurrentExerciseSet()
  }

  return (
    <Modal
    className='set-targets-modal'
    show={modalShow}
    onHide={confirmClose}
    size='sm'
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
          onClick={handleFinishedSettingTargets}>
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
  bulkWriteCurrentExerciseSets,
  clearCurrentExerciseSet
}

export default connect(mapStateToProps, mapDispatchToProps)(SetTargetsModal)
