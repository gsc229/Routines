import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'

export const SetGroupForm = (props) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Add Exercise
        </Form.Label>
        <Form.Control type='text'/>
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupForm)
