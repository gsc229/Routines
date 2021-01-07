import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroyWeek} from '../../1_Actions/weekActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const ConfirmDeleteWeekModal = ({
  destroyWeek,
  week,
  modalShow,
  setModalShow,
  confirmingTextObject,
  failingTextObject,
  error_message
}) => {

  const [deleteFailed, setDeleteFailed] = useState(false)


  confirmingTextObject ? confirmingTextObject = confirmingTextObject : confirmingTextObject = {
  title: `Are sure you want to delete Week: ${week.week_number}?`, 
  paragraph: 
  "Deleting a week will delete all the set groups connected to that week, but your records for doing the exercises will be saved"}

  failingTextObject ? failingTextObject = failingTextObject : failingTextObject = 
  {title: "Sorry!", paragraph: "Looks like something went wrong. Try again later"}

  const handleDelete = async () => {
    const response = await destroyWeek(week._id)
    if(response.success){
      return setModalShow(false)
    }
    setDeleteFailed(true)
    setTimeout(() => {
      setDeleteFailed(false)
      setModalShow(false)
    }, 5000)

  }

  return (
    <div className='delete-week-outer-modal-container'>
      {!deleteFailed && 
        <Modal
        className='delete-week-modal'
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby={`week-${week._id}`}
        centered>
          <Modal.Header 
          className='delete-modal-header'
          closeButton>
            <Modal.Title id={`week-${week._id}`}>
                {confirmingTextObject.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{confirmingTextObject.paragraph}</p>
          </Modal.Body>
      
          <Modal.Footer>
           <Button onClick={handleDelete} >DELETE WEEK</Button>
          </Modal.Footer>
        </Modal>
      }
      {deleteFailed && 
        <Modal
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
            {error_message &&
            <p>error message: {error_message}</p>}
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
  error_message: state.weekReducer.error_message
})

const mapDispatchToProps = {
  destroyWeek
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteWeekModal)
