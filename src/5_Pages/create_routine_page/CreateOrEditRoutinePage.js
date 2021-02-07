import React from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineInfoForm from '../../4_Components/manage_routines/form_routine/RoutineInfoForm'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'

const CreateRoutine = ({crudingRoutine}) => {

  const history = useHistory()

  return (
    <Layout>
      <Container className='page create-routine-page' >

        {!crudingRoutine && 
        <RoutineInfoForm handleClose={() => history.push('/manage-routines')}/>}

        {crudingRoutine === 'updating-routine' && 
        <DarkSpinner text='Saving...' />}

      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  currentIsSaved: state.routineReducer.currentIsSaved, 
  crudingRoutine: state.routineReducer.crudingRoutine 
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoutine)
