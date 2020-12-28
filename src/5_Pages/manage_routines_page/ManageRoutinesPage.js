import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {clearCurrentRoutine, setCurrentRoutine, saveRoutineChanges, fetchRoutines} from '../../1_Actions/routineActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {FaPlus} from 'react-icons/fa'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import RoutinesAccordion from '../../4_Components/accordion_routines/RoutinesAccordion'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'

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
    alert('Fetchting all routines')
    fetchRoutines(`?user=${userId}&populate_weeks=true`)
  }, [])

  return (
    <LayoutOne showTop={false}>
      <Container className='manage-routines container'>
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


