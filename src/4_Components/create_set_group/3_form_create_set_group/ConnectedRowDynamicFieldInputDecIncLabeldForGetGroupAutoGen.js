import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import ConnectedDecrementLabeled from './ConnectedDecrementLabeled'
import ConnectedIncrementLabeled from './ConnectedIncrementLabeled'
import ConnectedDynamicFiledInputLabeled from './ConnectedInputDynamicFieldLabeledForSetGroupAutoGen'

const ConnectedRowDynamicFiledInputForSetGroupAutoGen = ({
  writingCreateSetGroupData,
  createSetGroupData,
  placeholderText='optional',
  startingField,
  fieldLabelText,
  changeOptions,
  incrementLabelText,
  decrementLabelText,
  showLabel,
  inputSize,
  xs,
  sm='12',
  md,
  lg,
  xl
}) => {

  const [changeOption, setChangeOption] = useState('choose')

  const decIncField = startingField.split('_')[1]

  useEffect(() => {

    if(changeOption === "choose" || changeOption === "clear"  ){
      writingCreateSetGroupData(`percent_${decIncField}_increase`, 0)
      writingCreateSetGroupData(`percent_${decIncField}_decrease`, 0)
      writingCreateSetGroupData(`${decIncField}_increase`, 0)
      writingCreateSetGroupData(`${decIncField}_decrease`, 0)
    }

    if(changeOption === "increment"){
      writingCreateSetGroupData(`percent_${decIncField}_decrease`, 0)
      writingCreateSetGroupData(`${decIncField}_decrease`, 0)
    }

    if(changeOption === 'decrement'){
      writingCreateSetGroupData(`percent_${decIncField}_increase`, 0)
      writingCreateSetGroupData(`${decIncField}_increase`, 0)
    }

  }, [changeOption])

  return (
    <Row>
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className='input-column'>
        <ConnectedDynamicFiledInputLabeled
        labelText={fieldLabelText}
        placeholder={placeholderText}
        startingField={startingField} 
        inputSize={inputSize}/>
      </Col>

      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className='select-column'>
        <Form.Group>
          <Form.Control onChange={(e) => setChangeOption(e.target.value)} size={inputSize} as='select'>
            <option value="choose">Increase or Decrease {decIncField.charAt(0).toUpperCase() + decIncField.slice(1)}?</option>
            <option value='increment'>Increase</option>
            <option value='decrement' >Decrease</option>
          </Form.Control>
        </Form.Group>
      </Col>

      {changeOption === 'increment' && 
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className='input-column'>
        <ConnectedIncrementLabeled
        showLabel={showLabel} 
        labelText={incrementLabelText}
        incrementField={decIncField}
        inputSize={inputSize}/>
        
      </Col>}
      {changeOption === 'decrement' && 
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className='input-column'>
        <ConnectedDecrementLabeled
        showLabel={showLabel} 
        labelText={decrementLabelText}
        decrementField={decIncField} 
        inputSize={inputSize}/>
      </Col>}
    </Row>
  )
}

ConnectedRowDynamicFiledInputForSetGroupAutoGen.propTypes = {

  startingField: PropTypes.oneOf(['rep_max ', 'reps_per_set', 'starting_weight', 'starting_time', 'starting_distance', 'total_sets']).isRequired 
}


const mapStateToProps = (state) => ({
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
  writingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedRowDynamicFiledInputForSetGroupAutoGen)
