import React, {useState} from 'react'
import { connect } from 'react-redux'
import {publicExercisesQuery} from '../../1_Actions/exerciseActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import SearchExercisesForm from '../../4_Components/form_search_exercises/SearchExercisesForm'
import ExerciseCard from '../../4_Components/exercise/card_exercise/ExerciseCard'


export const BrowseExercises = ({
  exerciseSearchResults,
}) => {

 
  return (
    <Layout>
      <Container>
        <h1>Browse Exercises</h1>
        <SearchExercisesForm />
        <h5>Results: </h5>
        {exerciseSearchResults.length > 0 && 
        <div className='exercise-search-results'>
          {/* {JSON.stringify(exerciseSearchResults, "", 2)} */}
          {exerciseSearchResults.map(exercise => {return(
          <ExerciseCard key={exercise._id} exercise={exercise}/>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseExercises)

