import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {userExercisesQuery, clearCurrentExercise} from '../../1_Actions/exerciseActions'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ExerciseCard from '../../4_Components/exercise/card_exercise/ExerciseCard'
import {FaRegHandPointLeft} from 'react-icons/fa'

export const ManageExercisesPage = ({
  userExercises,
  userExercisesQuery,
  userId,
  clearCurrentExercise
}) => {

  


  useEffect(() => {
    !userExercises.length && userExercisesQuery(`original_creator=${userId}`)
    .then(res => console.log({res}))
  }, [userExercises.length, userId, userExercisesQuery])

  const handleCreateNew = () => {
    clearCurrentExercise()
  }

  return (
    <LayoutOne>
      <Container className="page container manage-exercises">
        <div className='manage-exercises-top'>
          <h2>Your Exercises: </h2>
          <Link to='/create-exercise'>
            <Button onClick={handleCreateNew} variant='primary'>Create New Exercise</Button>
          </Link>
        </div>
        <Link to='/browse-exercises'>Search for more exercises form other members <FaRegHandPointLeft /> </Link>
        <div className="exercise-bank">
          {!userExercises.length && <p>You currently don't have any exercises. Browse Exercises or Create Your Own</p>}
          {userExercises.length > 0 && userExercises.map(exercise => <ExerciseCard key={exercise._id} exercise={exercise} />)}
        </div>
      </Container>  
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  userExercises: state.exerciseReducer.userExercises,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  userExercisesQuery,
  clearCurrentExercise
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageExercisesPage)
