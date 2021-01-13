import React, {useState} from 'react'
import { connect } from 'react-redux'
import {bulkWriteCurrentExerciseSets, clearCurrentExerciseSet} from '../../../1_Actions/exerciseSetActions'
import {clearCreateSetGroupData, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {createSetGroupLocal} from '../../create_set_group/createSetGroupLocal'
import Modal from 'react-bootstrap/Modal'
import CloseAlert from './CloseAlert'
import Button from 'react-bootstrap/Button'
import SubGroupBuilder from '../../create_set_group/3_targets_and_subgroups/SubGroupBuilder'

export const SubSetModal = ({
  modalShow,
  setModalShow,
  currentSetGroup,
  createSetGroupData,
  currentExerciseSet,
  currentExerciseSets,
  bulkWriteCurrentExerciseSets,
  clearCurrentExerciseSet,
  clearCreateSetGroupData,
  writingCreateSetGroupData,
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
    clearCreateSetGroupData()
    clearCurrentExerciseSet()
    writingCreateSetGroupData('currentStep', 'choose-exercise')
    
  }

  const buildSubGroup = () => {
    const newSubGroup = 
    createSetGroupLocal(currentSetGroup, createSetGroupData, currentExerciseSet)

    const currentSetsCopy = [...currentExerciseSets]
    currentSetsCopy.splice(index, 1, ...newSubGroup)

    bulkWriteCurrentExerciseSets(currentSetsCopy)

    setModalShow(false)
    clearCurrentExerciseSet()
    clearCreateSetGroupData()
    writingCreateSetGroupData('currentStep', 'choose-exercise')
  }

  return (
    <Modal
    className='sub-group-modal'
    show={modalShow}
    onHide={confirmClose}
    size='md'
    aria-labelledby={`set-${exercise._id}`}
    centered>

      <Modal.Header
      closeButton={!alertShow}>
        <h5>{currentExerciseSet.exercise.name || "No Name"} Sub Group</h5>
        
      </Modal.Header>

      {alertShow && 
      <Modal.Body className='modal-body-alert' >
        <CloseAlert alertShow={alertShow} />
        <div className='continue-close-btns'>
          <Button className='continue-btn' variant='success' onClick={() => setAlertShow(false)}>Continue Working</Button> 
          <Button className='close-btn' onClick={colseConfirmed}>Close</Button>
        </div>
      </Modal.Body>}

      {!alertShow && 
      <Modal.Body className='modal-body-normal'>
        
        <SubGroupBuilder inputSize='sm' />
        
      </Modal.Body>}
      <Modal.Footer>
       {!alertShow && 
        <Button
          variant='success'
          className='done-setting-targets-btn'
          onClick={buildSubGroup}>
          Build Sub Group And Insert
        </Button>}
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  createSetGroupData: state.setGroupReducer.createSetGroupData,
  currentExerciseSet: state.exerciseSetReducer.currentExerciseSet,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  bulkWriteCurrentExerciseSets,
  clearCurrentExerciseSet,
  clearCreateSetGroupData,
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(SubSetModal)
