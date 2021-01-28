import React from 'react'
import { connect } from 'react-redux'
import {localWritingExerciseSet} from '../../1_Actions/exerciseSetActions'
import Form from 'react-bootstrap/Form'
import InputputGroup from 'react-bootstrap/InputGroup'

export const RecordSetInput = ({
  field,
  labelText,
  placeholder,
  localWritingExerciseSet
}) => {

  return (
    <Form.Group>
      <Form.Label>
        {labelText}
      </Form.Label>
      <InputputGroup>
        <Form.Control
          type='number'
          min={0}
          name={field}
          placeholder={placeholder || 'Enter actual...'}
          className={`record-set-input record-set-input-${field}`}
          onChange={(e) => localWritingExerciseSet(e.target.name, JSON.parse(e.target.value))}>
        </Form.Control>
      </InputputGroup>
    </Form.Group>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  localWritingExerciseSet
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSetInput)
