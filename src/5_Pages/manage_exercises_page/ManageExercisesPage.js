import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {userExercisesQuery} from '../../1_Actions/exerciseActions'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import BrowseExercises from '../../4_Components/exercise/BrowseExercises'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ExerciseAccordion from '../../4_Components/accordion_exercise/ExerciseAccordion'
import ExerciseCard from '../../4_Components/card_exercise/ExerciseCard'

export const ManageExercisesPage = ({
  userExercises,
  userExercisesQuery,
  userId
}) => {

  

  const [bankType, setBankType] = useState("card")


  useEffect(() => {
    userExercisesQuery(`original_creator=${userId}`)
    .then(res => console.log({res}))
  }, [])

  return (
    <LayoutOne>
      <Container className="container manage-exercises">
        <div className='manage-exercises-top'>
          <h2>ManageExercisesPage</h2>
          <Link to='/create-exercise'>
            <Button variant='primary'>Create New Exercise</Button>
          </Link>
        </div>
        <div className="exercise-bank">
          {bankType === "accordion" && <ExerciseAccordion />}
          {!userExercises.length && <p>You currently don't have any exercises. Browse Exercises or Create Your Own</p>}
          {userExercises.map(exercise => <ExerciseCard exercise={exercise} />)}
        </div>
        
        <BrowseExercises />
      </Container>  
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  userExercises: state.exerciseReducer.userExercises,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  userExercisesQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageExercisesPage)
