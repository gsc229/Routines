import React from 'react'
import {GithubPicker} from 'react-color'
import Modal from 'react-bootstrap/Modal'

const ColorPickerModal = ({
  setShowPickerModal,
  showPickerModal, 
  handleColorPick}) => {
  return (
    <Modal
    size='sm'
    onHide={() => setShowPickerModal(false)}
    className='color-picker-modal modal'
    centered
    show={showPickerModal}>
      <Modal.Body>
        <GithubPicker triangle='hide' onChangeComplete={handleColorPick} />
      </Modal.Body>
    </Modal>
  )
}

export default ColorPickerModal
