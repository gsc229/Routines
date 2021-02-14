import React, {useState} from 'react'
import { connect } from 'react-redux'
import {publicExercisesQuery} from '../../../1_Actions/exerciseActions'
import { muscleGroupList } from '../../dashboard/helpers/muscleGroupNameAndColorList'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'

export const SearchExercisesForm = ({
  publicExercisesQuery
}) => {


  const [queryCheckBoxValues, setQueryCheckBoxValues] = useState([])
  const [queryTextInputValue, setQueryTextInputValue] = useState("")
 
  let queryString = ""
  if(queryTextInputValue.length && queryCheckBoxValues.length){
    queryString = queryTextInputValue + "&"  + queryCheckBoxValues.join("&")
  } else if(!queryString.length && queryCheckBoxValues.length){
    queryString = queryCheckBoxValues.join("&")
  } else{
    queryString = queryTextInputValue.length ? queryTextInputValue : ""
  }


  const submitSearch = (e) => {
    e.preventDefault()
    
    publicExercisesQuery(queryString)
  }

  const handleTextInput = (e) => {
    let newStr = e.target.value.length ? "name=" + e.target.value : ""
    setQueryTextInputValue(newStr)
  }

  const handleCheckValue = (e) => {
    if(!queryCheckBoxValues.includes(e.target.value)){
      setQueryCheckBoxValues([...queryCheckBoxValues, e.target.value])
    } else{
      setQueryCheckBoxValues(queryCheckBoxValues.filter(val => val !== e.target.value))
    }
  }

  return (
    <Form onSubmit={submitSearch} className='search-exercises-form'>
      <InputGroup>
        <Form.Control name='name=' onChange={handleTextInput} type="text" placeholder="Search by Exercise Name"/>
        <InputGroup.Append>
          <Button onClick={submitSearch}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
      <Form.Group 
      className='form-group-muscle-group-and-category' 
      controlId="category">
        <Row 
        className='row-muscle-group-and-category'
        style={{display: 'flex' }}>
        <Col 
        className='col-muscle-group-and-category'
        xs='12' sm='6'>
          <div
          className='form-label-container'>
            <Form.Label style={{marginLeft: 0, paddingLeft: 0}} column sm={12}>
              Exercise Category
            </Form.Label>
          </div>
          <div className='form-checkbox-container'>
            <Form.Check
              onClick={handleCheckValue}
              label="Endurance"
              name="category"
              value="category[in]=Endurance"
              id="Endurance"
            />
            <Form.Check
              onClick={handleCheckValue}
              label="Strength"
              name="category"
              value="category[in]=Strength"
              id="Strength"
            />
            <Form.Check
              onClick={handleCheckValue}
              label="Flexibility"
              name="category"
              value="category[in]=Flexibility"
              id="Flexibility"
            />
            <Form.Check
              onClick={handleCheckValue}
              label="Balance"
              name="category"
              value="category[in]=Balance"
              id="Balance"
            />
          </div>
        </Col>
        <Col 
        className='col-muscle-group-and-category'
        xs='12' sm='6'>
        <div
        className='form-label-container'>
          <Form.Label style={{marginLeft: 0, paddingLeft: 0}} column sm={12}>
            Muscle Group
          </Form.Label>
        </div>
          <div className='form-checkbox-container'>
            {muscleGroupList.sort((a, b) => (a.name > b.name) ? 1 : -1).map((mg, idx) => (
              <Form.Check 
              onClick={handleCheckValue}
              label={mg.name}
              name="muscle_group"
              value={`muscle_group[in]=${mg.name}`} 
              id={`muscle_group${idx}`}/>
            ))}
          </div>
        </Col>
        </Row>
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  publicExercisesQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchExercisesForm)
