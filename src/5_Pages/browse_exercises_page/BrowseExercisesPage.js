import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {clearExerciseSearchResults} from '../../1_Actions/exerciseActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import SearchExercisesForm from '../../4_Components/exercise/form_search_exercises/SearchExercisesForm'
import ExerciseCard from '../../4_Components/exercise/card_exercise/ExerciseCard'


export const BrowseExercises = ({
  exerciseSearchResults,
  clearExerciseSearchResults
}) => {

  useEffect(() => {
    clearExerciseSearchResults()
  },[clearExerciseSearchResults])
 
  return (
    <Layout>
      <Container className='page browse-exercise-page'>
        <h1>Browse Exercises</h1>
        <div className='browse-exercise-search-container'>
          <SearchExercisesForm />
            {exerciseSearchResults.length > 0 && 
            <div className='exercise-search-results-outer'>
              <h5>Results: </h5>
              <div className='exercise-search-results-inner'>
                {/* {JSON.stringify(exerciseSearchResults, "", 2)} */}
                {exerciseSearchResults.map(exercise => {return(
                <ExerciseCard key={exercise._id} exercise={exercise}/>
                )})}
              </div>
            </div>}
        </div>
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({  
  exerciseSearchResults: state.exerciseReducer.exerciseSearchResults
})

const mapDispatchToProps = {
  clearExerciseSearchResults
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseExercises)

