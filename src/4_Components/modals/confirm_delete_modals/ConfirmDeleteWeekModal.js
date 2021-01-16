import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroyWeek, setScheduleDnDSelectedWeekNumber} from '../../../1_Actions/weekActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const ConfirmDeleteWeekModal = ({
  destroyWeek,
  week,
  modalShow,
  setModalShow,
  confirmingTextObject,
  failingTextObject,
  error_message,
  setScheduleDnDSelectedWeekNumber
}) => {

  const [deleteFailed, setDeleteFailed] = useState(false)


  confirmingTextObject ? confirmingTextObject = confirmingTextObject : confirmingTextObject = {
  title: <p className='delete-modal-heading-text'>Are you sure you want to delete <span className='delete-modal-heading-name-sapn'>Week: {week.week_number}</span> ?</p>, 
  paragraph: 
  "Deleting a week will delete all the set groups connected to that week, but your records for doing the exercises will be saved"}

  failingTextObject ? failingTextObject = failingTextObject : failingTextObject = 
  {title: "Sorry!", paragraph: "Looks like something went wrong. Try again later"}

  const handleDelete = async () => {
    const response = await destroyWeek(week._id)
    if(response.success){
      setScheduleDnDSelectedWeekNumber('all')
      return setModalShow(false)
    }
    setDeleteFailed(true)
    setTimeout(() => {
      setDeleteFailed(false)
      setModalShow(false)
    }, 5000)

  }

  return (
    <div className='delete-week-outer-modal-container modal'>
      {!deleteFailed && 
        <Modal
        className='delete-week-modal'
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby={`week-${week._id}`}
        centered>
          <Modal.Header 
          className='modal-header delete-week-modal-header'
          closeButton>
            <Modal.Title className='confirm-delete-title' id={`week-${week._id}`}>
                {confirmingTextObject.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <p>{confirmingTextObject.paragraph}</p>
          </Modal.Body>
      
          <Modal.Footer className='modal-footer'>
           <Button onClick={handleDelete} >DELETE WEEK</Button>
          </Modal.Footer>
        </Modal>
      }
      {deleteFailed && 
        <Modal
        className='delete-week-modal-fail'
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
          <Modal.Body className='modal-body'>
            <p>{failingTextObject.paragraph}</p>
            {error_message &&
            <p>error message: {error_message}</p>}
          </Modal.Body>
      
          <Modal.Footer className='modal-footer'>
            <Button onClick={()=> setDeleteFailed(false)} variant='success' >Close</Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  error_message: state.weekReducer.error_message
})

const mapDispatchToProps = {
  destroyWeek,
  setScheduleDnDSelectedWeekNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteWeekModal)
