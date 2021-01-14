import React, {useState} from 'react'
import { connect } from 'react-redux'
import {localBulkWriteExerciseSets, clearCurrentExerciseSet, bulkSaveExerciseSets} from '../../../1_Actions/exerciseSetActions'
import {clearCreateSetGroupData, localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
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
  localBulkWriteExerciseSets,
  clearCurrentExerciseSet,
  clearCreateSetGroupData,
  localWritingCreateSetGroupData,
  bulkSaveExerciseSets,
  index
}) => {

  
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    text: "Are you sure you want to close?",
    continue_btn: true

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
    setAlertConfig(false)
    clearCreateSetGroupData()
    clearCurrentExerciseSet()
    localWritingCreateSetGroupData('currentStep', 'choose-exercise')
    
  }

  const buildSubGroup = async () => {
    const newSubGroup = createSetGroupLocal(currentSetGroup, createSetGroupData, currentExerciseSet)
    console.log({newSubGroup})
    const currentSetsCopy = [...currentExerciseSets]
    currentSetsCopy.splice(index, 1, ...newSubGroup)
    // if the set groups been created already...
    if(currentSetGroup._id){

      const updatesOrInserts = []

      newSubGroup.forEach(set => {
        // mongoose bulk update objects
          if(set._id){
            updatesOrInserts.push({
              updateOne: {
                filter: {_id: set._id},
                update: set
              }
            })
          } else{
            updatesOrInserts.push({
              insertOne: {
                document: set
              }
            })
          }

        
      })

      const subGroupResonse = bulkSaveExerciseSets(updatesOrInserts)
      if(!subGroupResonse){
        // report the error in the alert
        setAlertConfig({
          show: true,
          text: 'Something went wrong pleas try again later.',
          continue_btn: false
        })
      }
      setModalShow(false)
      clearCurrentExerciseSet()
      clearCreateSetGroupData()
      localWritingCreateSetGroupData('currentStep', 'choose-exercise')

      return
    
    }

    localBulkWriteExerciseSets(currentSetsCopy)
    setModalShow(false)
    clearCurrentExerciseSet()
    clearCreateSetGroupData()
    localWritingCreateSetGroupData('currentStep', 'choose-exercise')
  }

  return (
    <Modal
    className='sub-group-modal modal'
    show={modalShow}
    onHide={confirmClose}
    size='md'
    aria-labelledby={`set-${exercise._id}`}
    centered>

      <Modal.Header
      closeButton={!alertConfig.show}>
        <h5>{currentExerciseSet.exercise.name || "No Name"} Sub Group</h5>
      </Modal.Header>

      {alertConfig.show && 
      <Modal.Body className='modal-body-alert' >

        <CloseAlert alertConfig={alertConfig} />

        <div className='continue-close-btns'>

          {alertConfig.continue_btn && 
          <Button className='continue-btn' variant='success' onClick={() => setAlertConfig(false)}>Continue Working</Button>}
          
          <Button className='close-btn' onClick={colseConfirmed}>Close</Button>

        </div>
      </Modal.Body>}

      {!alertConfig.show && 
      <Modal.Body className='modal-body-normal'>
        
        <SubGroupBuilder inputSize='sm' />
        
      </Modal.Body>}
      <Modal.Footer>
       {!alertConfig.show && 
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
  localBulkWriteExerciseSets,
  clearCurrentExerciseSet,
  clearCreateSetGroupData,
  localWritingCreateSetGroupData,
  bulkSaveExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(SubSetModal)
