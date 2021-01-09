import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ConnectedDecrementLabeled from './ConnectedDecrementLabeled'
import ConnectedIncrementLabeled from './ConnectedIncrementLabeled'
import ConnectedDynamicFiledInputLabeled from './ConnectedDynamicFiledInputLabeled'

const LabeledDynamicRow = ({
  incrementField,
  decrementField,
  field
}) => {

  return (
    <Row>
      <Col className='input-column' lg='3' sm='12'>
         <ConnectedDynamicFiledInputLabeled placeholder='optional' field={field} />
      </Col>
      {incrementOrDecrement === 'increment' && 
      <ConnectedIncrementLabeled incrementField={incrementField} />}
      {incrementOrDecrement === 'decrement' && 
      <ConnectedDecrementLabeled decrementField={decrementField} />}
    </Row>
  )
}

LabeledDynamicRow.propTypes = {
  incrementField: PropTypes.oneOf(["weight", "reps", "time", "distance", "rest_time"]).isRequired,
  decrementField: PropTypes.oneOf(["weight", "reps", "time", "distance", "rest_time"]).isRequired,
  field: PropTypes.oneOf(['rep_max ', 'reps_per_set', 'starting_weight', 'starting_time', 'starting_distance', 'total_sets']).isRequired 
}

export default LabeledDynamicRow
