import React from 'react'
import Form from 'react-bootstrap/Form'

const LineChartChecboxes = ({
  setDuration,
  setShowActuals,
  duration,
  showActuals,
  startDate
}) => {
  return (
  <div className='checkboxes-container'>
    <Form className='all-time-checkbox-form'>
      <div className='form-group-container'>
        <Form.Group>
          <Form.Check
          label='Year'
          onClick={() => setDuration('year')}
          checked={duration==='year'}
          name='year'
          value='year'
          type='radio' 
          />
          <Form.Check
          label={startDate.clone().format("MMMM")}
          onClick={() => setDuration('month')}
          checked={duration==='month'}
          name='month'
          value='month'
          type="radio"
          />
      </Form.Group>
      </div>
    </Form>
    <Form className='target-or-actual-form'>
        <div className='form-group-container'>
          <Form.Group>
            <Form.Check
            label='Target'
            onClick={() => setShowActuals(false)}
            checked={!showActuals}
            name='year'
            value='year'
            type='radio' 
            />
            <Form.Check
            label='Actual'
            onClick={() => setShowActuals(true)}
            checked={showActuals}
            name='month'
            value='month'
            type="radio"
            />
        </Form.Group>
        </div>
      </Form>
  </div>
  )
}

export default LineChartChecboxes
