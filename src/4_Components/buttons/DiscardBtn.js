import React from 'react'
import Button from 'react-bootstrap/Button'
import {RiArrowGoBackLine} from 'react-icons/ri'

const DiscardBtn = ({className, onClick, text=" Discard Changes", style, Icon=RiArrowGoBackLine, variant='warning'}) => {
  return (
    <Button
    className={`discard-btn ${className}`}
    onClick={onClick}
    variant={variant} 
    style={{...style, }} >
      <Icon/>&nbsp;{text}
    </Button>
  )
}

export default DiscardBtn
