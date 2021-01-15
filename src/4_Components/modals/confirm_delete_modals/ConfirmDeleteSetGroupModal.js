import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroySetGroup} from '../../../1_Actions/setGroupActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ConfirmDeleteModal = ({
  destroySetGroup,
  modalShow, 
  setModalShow,
  setGroup,
  confirmingTextObject={
    title: <p className='delete-modal-heading-text'>Are you sure you want to delete <span className='delete-modal-heading-name-sapn'>{setGroup.name}</span>?</p>,
    paragraph: 'Deleting a set group deletes the set group, but records of your exercise sets will be saved.'
  },
  failingTextObject={
    title: `Sorry!`,
    paragraph: `There was a problem deleting ${setGroup.name}. Please try again later`
  }
}) => {

  const [deleteFailed, setDeleteFailed] = useState(false)


  const handleDelete = async () => {

      const destroyResult = await  destroySetGroup(setGroup._id)

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
        className='delete-setGroup-modal'
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby={`setGroup-${setGroup._id}`}
        centered>
          <Modal.Header className='modal-header' closeButton>
            <Modal.Title id={`setGroup-${setGroup._id}`}>
                {confirmingTextObject.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <p>{confirmingTextObject.paragraph}</p>
          </Modal.Body>
      
          <Modal.Footer className='modal-footer'>
           <Button onClick={handleDelete} >DELETE</Button>
          </Modal.Footer>
        </Modal>
      }
      {deleteFailed && 
        <Modal
        className='delete-setGroup-modal-fail'
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
  destroySetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteModal)