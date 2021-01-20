import React from 'react'
import Modal from 'react-bootstrap/Modal'

const ModalLayoutOne = ({
  header,
  body,
  footer,
  show,
  size='md',
  className,
  centered=true,
  closeButton=true,
  onHide
}) => {


  return (
    <Modal
    className={`modal-layout-one ${className}`}
    onHide={onHide}
    centered={centered}
    size={size}
    show={show}>
      <Modal.Header closeButton={closeButton}>
        {header}
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </Modal>
  )
}

export default ModalLayoutOne
