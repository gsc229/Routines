import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroyRoutine} from '../../../1_Actions/routineActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ConfirmDeleteModal = ({
  destroyRoutine,
  modalShow, 
  setModalShow,
  routine,
  confirmingTextObject={
    title: `Are you sure you want to delete ${routine.name}?`,
    paragraph: 'Deleting a routine deletes set groups, but records of your exercise sets will be saved.'
  },
  failingTextObject={
    title: `Sorry!`,
    paragraph: `There was a problem deleting ${routine.name}. Please try again later`
  }
}) => {

  

  const [deleteFailed, setDeleteFailed] = useState(false)
  console.log('ConfirmDeleteModal', {routine})


  const handleDelete = async () => {

      const destroyResult = await  destroyRoutine(routine._id)

      if(destroyResult.success){
        setModalShow(false)
      }

      if(!destroyResult){
        setDeleteFailed(true)
        setModalShow(false)
        setTimeout(() => {
          setDeleteFailed(false)
        },5000)

      }
    }


  return (
    <div className='outer-modal-container modal'>
      {!deleteFailed && 
        <Modal
        className='delete-routine-modal'
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby={`routine-${routine._id}`}
        centered>
          <Modal.Header className='modal-header' closeButton>
            <Modal.Title id={`routine-${routine._id}`}>
                {confirmingTextObject.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <p>{confirmingTextObject.paragraph}</p>
          </Modal.Body>
      
          <Modal.Footer className='modal-footer'>
           <Button onClick={handleDelete} >DELETE ROUTINE</Button>
          </Modal.Footer>
        </Modal>
      }
      {deleteFailed && 
        <Modal
        className='delete-routine-modal-fail'
        show={deleteFailed}
        onHide={() => setDeleteFailed(false)}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header closeButton>
            <Modal.Title id='confirm-delete-modal-title'>
                {failingTextObject.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{failingTextObject.paragraph}</p>
          </Modal.Body>
      
          <Modal.Footer>
            <Button onClick={()=> setDeleteFailed(false)} variant='success' >Close</Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  destroyRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteModal)

