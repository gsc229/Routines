import React, {useState} from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import SetTypeData from './SetTypeData';


export const SetGroupForm = (props) => {

  const [selectedSetType, setSelectedSetType] = useState("Straight")

  const setTypes = [
    "Straight",
    "Super",
    "Super - Antagonist", 
    "Super - Compound", 
    "Super - Tri", 
    "Super - Giant", 
    "Circuit", 
    "Pyramid",
    "Drop",
    "Stripping",
    "Rest - Pause",
    "Pre-Exhaustion"
    ]


  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Add Set Group
        </Form.Label>
        <InputGroup>
        <Form.Control type='text' placeholder='Set Group Name' />
        <InputGroup.Append>
          <InputGroup.Checkbox />
          <InputGroup.Text >Use Excerise Name</InputGroup.Text>
        </InputGroup.Append> 
        </InputGroup>
      </Form.Group>
      <Form.Group>
      <Tabs
      variant="pills" 
      onSelect={(type) => setSelectedSetType(type)}
      activeKey={selectedSetType}>
        {setTypes.map(type=>
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
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupForm)
