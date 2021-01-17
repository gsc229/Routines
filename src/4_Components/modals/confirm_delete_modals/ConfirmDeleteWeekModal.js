import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroyWeek, setScheduleDnDSelectedWeekNumber, bulkWriteWeeks} from '../../../1_Actions/weekActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const ConfirmDeleteWeekModal = ({
  destroyWeek,
  currentWeeks,
  currentWeek,
  bulkWriteWeeks,
  modalShow,
  setModalShow,
  confirmingTextObject,
  failingTextObject,
  error_message,
  setScheduleDnDSelectedWeekNumber
}) => {

  failingTextObject ? failingTextObject = failingTextObject : failingTextObject = 
  {title: "Sorry!", paragraph: "Looks like something went wrong. Try again later"}

  const [deleteFailed, setDeleteFailed] = useState({
    failed: false,
    title: failingTextObject.title ,
    paragraph: failingTextObject.paragraph
  })


  confirmingTextObject ? confirmingTextObject = confirmingTextObject : confirmingTextObject = {
  title: <p className='delete-modal-heading-text'>Are you sure you want to delete <span className='delete-modal-heading-name-sapn'>Week: {currentWeek.week_number}</span> ?</p>, 
  paragraph: 
  "Deleting a week will delete all the set groups connected to that week, but your records for doing the exercises will be saved"}

  const handleDelete = async () => {
    const deleteWeekNumber = currentWeek.week_number
    const routineId = currentWeek.routine
    const weekUpdates = []

    currentWeeks.forEach(wk => {
      if(wk.week_number > deleteWeekNumber){
        weekUpdates.push({
          updateOne: {
            filter: {_id: wk._id},
            update: {week_number:  wk.week_number - 1}
          }
        })
      }
    })
    const deleteResponse = await destroyWeek(currentWeek._id)
    if(deleteResponse.success && weekUpdates.length){
      const writeResponse = await bulkWriteWeeks(weekUpdates, routineId)
      if(writeResponse.success){
        setScheduleDnDSelectedWeekNumber('all')
        return setModalShow(false)
      } 
      
      return setDeleteFailed({
        ...deleteFailed,
        failed: true,
        paragraph: "Something went wrong syncronizing the weeks. Try the refresh button."
      })

      
      
    }
    setScheduleDnDSelectedWeekNumber('all')
    setDeleteFailed({
      ...deleteFailed,
      failed: true
    })
    setTimeout(() => {
      setDeleteFailed({
        ...deleteFailed,
        failed: false
      })
      setModalShow(false)
    }, 5000)

  }

  return (
    <div className='delete-week-outer-modal-container modal'>
      {!deleteFailed.failed && 
        <Modal
        className='delete-week-modal'
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby={`week-${currentWeek._id}`}
        centered>
          <Modal.Header 
          className='modal-header delete-week-modal-header'
          closeButton>
            <Modal.Title className='confirm-delete-title' id={`week-${currentWeek._id}`}>
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
      {deleteFailed.failed && 
        <Modal
        className='delete-week-modal-fail'
        show={deleteFailed.failed}
        onHide={() => {
          setDeleteFailed({
            ...deleteFailed,
            failed: false 
          })
          setModalShow(false)
        }}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header closeButton>
            <Modal.Title id='confirm-delete-modal-title'>
                {deleteFailed.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <p>{deleteFailed.paragraph}</p>
            {error_message &&
            <p>Error message: {error_message}</p>}
          </Modal.Body>
      
          <Modal.Footer className='modal-footer'>
            <Button onClick={()=> {
              setDeleteFailed({
                ...deleteFailed,
                failed: false 
              })
              setModalShow(false)
              }} variant='success' >Close</Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  error_message: state.weekReducer.error_message,
  currentWeeks: state.weekReducer.currentWeeks,
  currentWeek: state.weekReducer.currentWeek
})

const mapDispatchToProps = {
  destroyWeek,
  bulkWriteWeeks,
  setScheduleDnDSelectedWeekNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteWeekModal)
