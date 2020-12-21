import React from 'react'
import Button from 'react-bootstrap/Button'
import {IoSaveOutline} from 'react-icons/io5'

const SaveBtn = ({onClick, text=" Save Changes", Icon=IoSaveOutline, variant='success'}) => {

  return (
    <Button
    onClick={onClick}
    style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} 
    variant={variant}>
      <Icon />&nbsp;{text}
    </Button>
  )
}

export default SaveBtn
