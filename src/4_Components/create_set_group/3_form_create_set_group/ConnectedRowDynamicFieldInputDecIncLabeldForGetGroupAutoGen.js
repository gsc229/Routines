import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ConnectedDecrementLabeled from './ConnectedDecrementLabeled'
import ConnectedIncrementLabeled from './ConnectedIncrementLabeled'
import ConnectedDynamicFiledInputLabeled from './ConnectedInputDynamicFieldLabeledForSetGroupAutoGen'

const ConnectedLabeledDynamicRow = ({
  incrementField,
  decrementField,
  handleChange,
  placeholderText='optional',
  startingField,
  fieldLabelText,
  incrementLabelText,
  decrementLabelText,
  xs,
  sm='12',
  md,
  lg,
  xl
}) => {

  return (
    <Row>
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className='input-column'>
        <ConnectedDynamicFiledInputLabeled
        handleChange={handleChange} 
        labelText={fieldLabelText}
        placeholder={placeholderText}
        startingField={startingField} />
      </Col>
      {incrementField && 
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className='input-column'>
        <ConnectedIncrementLabeled 
        labelText={incrementLabelText}
        incrementField={incrementField}/>
      </Col>}
      {decrementField && 
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className='input-column'>
        <ConnectedDecrementLabeled 
        labelText={decrementLabelText}
        decrementField={decrementField} />
      </Col>}
    </Row>
  )
}

ConnectedLabeledDynamicRow.propTypes = {

  incrementField: PropTypes.oneOf(["weight", "reps", "time", "distance", "rest_time", null]).isRequired,
  decrementField: PropTypes.oneOf(["weight", "reps", "time", "distance", "rest_time", null]).isRequired,
  startingField: PropTypes.oneOf(['rep_max ', 'reps_per_set', 'starting_weight', 'starting_time', 'starting_distance', 'total_sets']).isRequired 
}

export default ConnectedLabeledDynamicRow
