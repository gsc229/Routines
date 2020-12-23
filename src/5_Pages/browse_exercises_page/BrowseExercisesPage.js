import React, {useState} from 'react'
import { connect } from 'react-redux'
import {publicExercisesQuery} from '../../1_Actions/exerciseActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import ExerciseCard from '../../4_Components/card_exercise/ExerciseCard'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export const BrowseExercises = ({
  exerciseSearchResults,
  publicExercisesQuery,
  location
}) => {

  const [queryCheckBoxValues, setQueryCheckBoxValues] = useState([])
  const [queryTextInputValue, setQueryTextInputValue] = useState("")
  /* let nameString, categoryString, muscleGroupString
  if(name)  nameString = `${name}`
  if(category.length)  categoryString = category.join(",")
  if(muscle_group.length)  muscleGroupString = muscle_group.join(",")
  let queryString = `${nameString ? 'name=' + nameString + '&' : ''}${categoryString ? 'category[in]='+ categoryString + '&' : ''}${muscleGroupString ? 'muscle_group[in]=' + muscleGroupString : ''}` */
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

  
  
  console.log({queryString})

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
  console.log({queryCheckBoxValues, queryTextInputValue})
  return (
    <Layout>
      <Container>
        <h1>Browse Exercises</h1>
        <Form onSubmit={submitSearch} className='search-exercises-form'>
          
          <Form.Group>
            <Form.Control name='name=' onChange={handleTextInput} type="text" placeholder="Search by Exercise Name"/>
          </Form.Group>
          <Form.Group controlId="category">
            <Row style={{display: 'flex' }}>
            <Col>
              <Form.Label style={{marginLeft: 0, paddingLeft: 0}} column sm={12}>
                Exercise Category
              </Form.Label>
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
            </Col>
            <Col>
            <Form.Label style={{marginLeft: 0, paddingLeft: 0}} column sm={12}>
              Muscle Group
            </Form.Label>
              <Form.Check
                onClick={handleCheckValue}
                label="Chest"
                name="muscle_group"
                value="muscle_group[in]=Chest"
                id="muscle_group1"
              />
              <Form.Check
                onClick={handleCheckValue}
                label="Arms"
                name="muscle_group"
                value="muscle_group[in]=Arms"
                id="muscle_group2"
              />
              <Form.Check
                onClick={handleCheckValue}
                label="Back"
                name="muscle_group"
                value="muscle_group[in]=Back"
                id="muscle_group3"
              />
              <Form.Check
                onClick={handleCheckValue}
                label="Shoulders"
                name="muscle_group"
                value="muscle_group[in]=Shoulders"
                id="muscle_group3"
              />
               <Form.Check
                onClick={handleCheckValue}
                label="Legs"
                name="muscle_group"
                value="muscle_group[in]=Legs"
                id="muscle_group1"
              />
              <Form.Check
                onClick={handleCheckValue}
                label="Calves"
                name="muscle_group"
                value="muscle_group[in]=Calves"
                id="muscle_group2"
              />
              <Form.Check
                onClick={handleCheckValue}
                label="Full Body"
                name="muscle_group"
                value="muscle_group[in]=Full Body"
                id="muscle_group3"
              />
              <Form.Check
                label="Multiple Major Muscle Groups"
                name="muscle_group"
                value="muscle_group[in]=Multiple Major Muscle Groups"
                id="muscle_group3"
              />
            </Col>
            </Row>
          </Form.Group>
  
        <Button onClick={submitSearch}>Search</Button>
        </Form>
        <h5>Results: </h5>
        {exerciseSearchResults.length > 0 && 
        <div className='exercise-search-results'>
          {/* {JSON.stringify(exerciseSearchResults, "", 2)} */}
          {exerciseSearchResults.map(exercise => {return(
          <ExerciseCard exercise={exercise}/>
          )})}
        </div>}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({  
  exerciseSearchResults: state.exerciseReducer.exerciseSearchResults
})

const mapDispatchToProps = {
  publicExercisesQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseExercises)

