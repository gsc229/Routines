import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const RemoveAllModal = ({
  modalShow,
  setModalShow,
  resource,
  handleRemoveAllClick,
  showCancelBtn=true,
  cancelBtnText='Cancel',
  confirmBtnText='REMOVE All',
  bodyInnerHtml
}) => {

  const handleConfirm = () => {
    handleRemoveAllClick(resource._id)
    setModalShow(false)
  }

  bodyInnerHtml = bodyInnerHtml ? bodyInnerHtml : <>Are you sure you want to remove all <span>{resource.name}</span>? </>

  return (
    <Modal
    className='remove-all-resources-modal modal'
    show={modalShow}
    onHide={() => setModalShow(false)}
    size='lg'
    aria-labelledby={`resource-${resource._id}`}
    centered>
      <Modal.Header
      closeButton>
        Confirm Delete
      </Modal.Header>
      <Modal.Body>
        {bodyInnerHtml}
      </Modal.Body>
      <Modal.Footer>
        <div className="confirm-cancel-btns">
          <Button 
          className='confirm-btn'
          onClick={handleConfirm}>{confirmBtnText}</Button>
          {showCancelBtn && 
          <Button 
          className='cancel-btn'
          onClick={() => setModalShow(false) } >{cancelBtnText}</Button>}
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveAllModal
