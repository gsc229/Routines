import React from 'react'
import { connect } from 'react-redux'
import {writingSetGroup} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export const SgNameInputForm = ({
  currentSetGroup,
  writingSetGroup
}) => {
  return (
    <Form className='info-form create-set-group-name-input-form'>
      <Form.Group>
        <Form.Label>
          Add Set Group
        </Form.Label>
          <InputGroup>
          <Form.Control 
          name='name'
          value={currentSetGroup.name}
          onChange={(e)=> writingSetGroup(e.target.name, e.target.value)}
          type='text' 
          placeholder='Set Group Name' />
          <InputGroup.Append>
            <OverlayTrigger overlay={<Tooltip>If multiple exercieses, the first one will be used</Tooltip>}>
            <InputGroup.Checkbox />
            </OverlayTrigger>
            <InputGroup.Text >Use Excerise Name</InputGroup.Text>
          </InputGroup.Append>
          </InputGroup>
      </Form.Group>
      </Form>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  writingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(SgNameInputForm)
