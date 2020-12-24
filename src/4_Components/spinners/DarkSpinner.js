import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const DarkSpinner = ({style}) => {
  return (
    <div style={{width: '100%', height: '500px', textAlign: 'center', backgroundColor: '#343A40', ...style}}>
      <Spinner style={{position: 'relative', top: '45%'}} animation="border" variant="light"/>
    </div>
  )
}

export default DarkSpinner
