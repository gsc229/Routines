import React, {useState} from 'react'
import { connect } from 'react-redux'
import {localBulkWriteExerciseSets, clearCurrentExerciseSet, saveExerciseSetChanges} from '../../../1_Actions/exerciseSetActions'
import Modal from 'react-bootstrap/Modal'
import CloseAlert from './CloseAlert'
import Button from 'react-bootstrap/Button'
import TargetsSetter from '../../create_set_group/3_targets_and_subgroups/TargetsSetter'

export const SetTargetsModal = ({
  modalShow,
  setModalShow,
  currentExerciseSet,
  saveExerciseSetChanges,
  clearCurrentExerciseSet
}) => {

  const [alertConfig, setAlertConfig] = useState({
    show: false,
    text: 'Are you sure you want to closee?',
    coninute_btn: false
  })

  const {exercise} = currentExerciseSet

  const confirmClose = () => {
    setAlertConfig({
      ...alertConfig,
      show: true
    })
  }

  const colseConfirmed = () => {
    setModalShow(false)
    setAlertConfig({
      ...alertConfig,
      show: false
    })
  }


  const handleFinishedSettingTargets = async () => {
    await saveExerciseSetChanges(currentExerciseSet._id, currentExerciseSet)
    setModalShow(false)
    clearCurrentExerciseSet()
  }

  return (
    <Modal
    className='set-targets-modal'
    show={modalShow}
    onHide={confirmClose}
    size='md'
    aria-labelledby={`set-${exercise._id}`}
    centered>

      <Modal.Header
      closeButton={!alertConfig.show}>
        Set Name: {currentExerciseSet.name || "No Name"}<br/>
        Exercise Name: {exercise.name || "No Name"}
      </Modal.Header>

      {alertConfig.show && 
      <Modal.Body className='modal-body-alert' >

        <CloseAlert alertConfig={alertConfig} />

        <div className='continue-close-btns'>
          <Button className='continue-btn' variant='success' onClick={() => setAlertConfig(false)}>Continue Working</Button> 
          <Button className='close-btn' onClick={colseConfirmed}>Close</Button>
        </div>
      </Modal.Body>}

      {!alertConfig.show && 
      <Modal.Body className='modal-body-normal'>
        <TargetsSetter />
        
      </Modal.Body>}
      <Modal.Footer>
        {!alertConfig.show && 
        <Button
          className='done-setting-targets-btn'
          onClick={handleFinishedSettingTargets}>
          Done
        </Button>}
      </Modal.Footer>
      

    </Modal>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  clearCurrentExerciseSet,
  saveExerciseSetChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(SetTargetsModal)
