import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import ExerciseForm from '../../4_Components/exercise/form_exercise/ExerciseForm'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'

export const CreateOrEditExercisePage = ({
  crudingExercise
}) => {
  return (
    <Layout>
      <Container className='page create-exercise-page' >
        {!crudingExercise && <ExerciseForm/>}
        {crudingExercise === 'deleting' && <DarkSpinner text='Deleting Exercise...' />}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
 crudingExercise: state.exerciseReducer.crudingExercise 
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExercisePage)
