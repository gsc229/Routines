import React from 'react'
import Alert from 'react-bootstrap/Alert'

const CloseAlert = ({

  alertConfig

}) => {

  return (
    <Alert
    className='modal-alert'
    variant='danger'
    show={alertConfig.show} >
      <Alert.Heading>
        {alertConfig.text}
      </Alert.Heading>
    </Alert>
  )
}

export default CloseAlert
