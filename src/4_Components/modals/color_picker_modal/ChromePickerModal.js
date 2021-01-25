import React from 'react'
import {ChromePicker} from 'react-color'
import Modal from 'react-bootstrap/Modal'

const ChromePickerModal = ({
  setShowPickerModal,
  showPickerModal, 
  handleColorPick,
  currentColor
}) => {
  return (
    <Modal
    size='sm'
    onHide={() => setShowPickerModal(false)}
    className='color-picker-modal modal'
    centered
    show={showPickerModal}>
      <Modal.Body>
        <ChromePicker
        disableAlpha={true}
        color={currentColor}
        styles={{zIndex: 100}}
        onChangeComplete={handleColorPick} />
      </Modal.Body>
    </Modal>
  )
}

export default ChromePickerModal