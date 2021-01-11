import React from 'react'
import { connect } from 'react-redux'
import {bulkWriteCurrentExerciseSets} from '../../../1_Actions/exerciseSetActions'
import Modal from 'react-bootstrap/Modal'

export const EditSetModal = ({
  modalShow,
  setModalShow,
  exerciseSet,
  exercise
}) => {
  return (
    <Modal
    className='edit-set-modal'
    show={modalShow}
    onHide={() => setModalShow(false)}
    size='lg'
    aria-labelledby={`set-${exerciseSet._id}`}
    centere>
      <Modal.Header
      closeButton>
        Set Name: {exerciseSet.name || "No Name"}<br/>
        Exercise Name: {exercise.name || "No Name"}
      </Modal.Header>
      <Modal.Body>
          THIS IS THE BODY
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets  
})

const mapDispatchToProps = {
  bulkWriteCurrentExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSetModal)
