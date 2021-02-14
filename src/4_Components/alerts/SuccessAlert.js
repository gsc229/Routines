import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

export const SuccessAlert = ({
  variant='success',
  text='Success',
  className
}) => {
  return (
    <Alert
    className={`success-alert ${className}`} 
    variant={variant}>
    {text}
    </Alert>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlert)
