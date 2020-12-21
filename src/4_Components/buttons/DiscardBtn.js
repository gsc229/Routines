import React from 'react'
import Button from 'react-bootstrap/Button'
import {RiArrowGoBackLine} from 'react-icons/ri'

const DiscardBtn = ({text=" Discard Changes", styles, Icon=RiArrowGoBackLine, variant='warning'}) => {
  return (
    <Button variant={variant} style={{...styles, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
      <Icon/>&nbsp;{text}
    </Button>
  )
}

export default DiscardBtn
