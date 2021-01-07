import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Tooltip from 'react-bootstrap/Tooltip'
import { connect } from 'react-redux'
import { writingSetGroup } from '../../../1_Actions/setGroupActions'
import SetTypeData from './SetTypeData'

export const SetGroupForm = ({
  currentSetGroup,
  setGroupTypes,
  writingSetGroup
}) => {

  const {set_group_type} = currentSetGroup

  return (
    <Form className='info-form setgroup-form'>
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
      <Form.Group>
      <h6>Quick Build: </h6>
      <Tabs
      variant= 'pills'
      onSelect={(type) => writingSetGroup('set_group_type',type)}
      activeKey={set_group_type}>
        {setGroupTypes.map(type=>
        <Tab
        key={type}
        title={type}
        eventKey={type}>
          <SetTypeData type={type} />
        </Tab>
        )}
      </Tabs>
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  setGroupTypes: state.setGroupReducer.set_group_types
})

const mapDispatchToProps = {
  writingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupForm)
