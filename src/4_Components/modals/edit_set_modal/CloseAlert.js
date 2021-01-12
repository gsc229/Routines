import React from 'react'
import Alert from 'react-bootstrap/Alert'

const CloseAlert = ({
  alertShow,
  text='Are you sure you want close?'
}) => {
  return (
    <Alert
      className='modal-alert'
      variant='danger'
      show={alertShow} >
        <Alert.Heading>
          {text}
        </Alert.Heading>
      </Alert>
  )
}

export default CloseAlert
