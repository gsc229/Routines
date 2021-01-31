import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { FaPlus } from 'react-icons/fa'
import { connect } from 'react-redux'
import { clearCurrentRoutine, fetchRoutines } from '../../1_Actions/routineActions'
import RoutinesAccordion from '../../4_Components/manage_routines/accordion_routines/RoutinesAccordion'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'

export const ManageRoutinesPage = ({
  history, 
  clearCurrentRoutine,
  fetchRoutines,
  userId,
  crudingRoutine,
  userRoutines
}) => {

  const handleNewClick = () => {
     clearCurrentRoutine()
     history.push('/create-routine')
  }
  /* old query ?user=${userId}&populate_one=weeks&populate_two=set_groups&populate_three=exercise_sets&populate_four=exercise */
  useEffect(() => {
    
    const fetchUserRoutines = async () => {
      await fetchRoutines(`?user=${userId}&populate_weeks=true&populate_set_groups=true&populate_exercise_sets_exercise=true`)
    }

    fetchUserRoutines()
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

  }, [])

  return (
    <LayoutOne showTop={false}>
      <Container className='page manage-routines container'>
        <Row>
          <Col lg='8' md='12' className="routines-column">
            <h2>Your Routines:</h2>
            <div className="options-menu">
                <Button onClick={handleNewClick}  id='new-routine' aria-current="page"><FaPlus /> New</Button>
            </div> 
            {crudingRoutine !== 'fetching' && userRoutines.length > 0 && 
            <RoutinesAccordion />}
            {crudingRoutine === 'fetching' && 
            <DarkSpinner />}
          </Col>
        </Row>
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id,
  crudingRoutine: state.routineReducer.crudingRoutine,
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  clearCurrentRoutine,
  fetchRoutines
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoutinesPage)


