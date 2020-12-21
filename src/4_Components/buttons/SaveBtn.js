import React from 'react'
import Button from 'react-bootstrap/Button'
import {IoSaveOutline} from 'react-icons/io5'

const SaveBtn = ({onClick, className, text=" Save Changes", Icon=IoSaveOutline, variant='success', style}) => {

  return (
    <Button
    className={className}
    onClick={onClick}
    style={{...style}} 
    variant={variant}>
      {Icon && <Icon />}&nbsp;{text}
    </Button>
  )
}

export default SaveBtn
