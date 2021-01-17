import React, {useState} from 'react'
import { connect } from 'react-redux'
import {localBulkWriteExerciseSets, clearCurrentExerciseSet, bulkWriteExerciseSets} from '../../../1_Actions/exerciseSetActions'
import {clearCreateSetGroupData, localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {createSetGroupLocal} from '../../create_set_group/createSetGroupLocal'
import Modal from 'react-bootstrap/Modal'
import CloseAlert from './CloseAlert'
import Button from 'react-bootstrap/Button'
import SubGroupBuilder from './SubGroupBuilder'

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
  bulkWriteExerciseSets,
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

    const firstId = currentExerciseSet._id
    delete currentExerciseSet._id
    const newSubGroup = createSetGroupLocal(currentSetGroup, createSetGroupData, currentExerciseSet)
    newSubGroup[0]._id = firstId
  
    const currentSetsCopy = [...currentExerciseSets]

    // if the set groups been created already...
    if(currentSetGroup._id){

      console.log({newSubGroup})
      

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
            set.exercise = set.exercise._id
            updatesOrInserts.push({
              insertOne: {
                document: set
              }
            })
          }

        
      })

      const subGroupResonse = await bulkWriteExerciseSets(updatesOrInserts, currentSetGroup._id)
      console.log({subGroupResonse})

        if(!subGroupResonse.success){
          // report the error in the alert
          setAlertConfig({
            show: true,
            text: `Something went wrong please try again later.`,
            continue_btn: false
          })

            // do this if it's a new setGroup
          localBulkWriteExerciseSets(currentExerciseSets)
          setModalShow(false)
          clearCurrentExerciseSet()
          clearCreateSetGroupData()
          localWritingCreateSetGroupData('currentStep', 'choose-exercise')

          return
        }
      
      
      //localBulkWriteExerciseSets(subGroupResonse.data)
      setModalShow(false)
      clearCurrentExerciseSet()
      clearCreateSetGroupData()
      localWritingCreateSetGroupData('currentStep', 'choose-exercise')
      return
    
    }
    // do this if it's a new setGroup

    currentSetsCopy.splice(index, 1, ...newSubGroup)
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
  bulkWriteExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(SubSetModal)
