import React from 'react'
import { connect } from 'react-redux'
import {clearCurrentRoutine, setCurrentRoutine, saveRoutineChanges} from '../../1_Actions/routineActions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {FaPlus} from 'react-icons/fa'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import RoutinesAccordion from '../../4_Components/accordion_routines/RoutinesAccordion'


export const ManageRoutinesPage = ({
  history, 
  clearCurrentRoutine, 
}) => {

  const handleNewClick = () => {
     clearCurrentRoutine()
     history.push('/create-routine')
  }

  return (
    <LayoutOne showTop={false}>
      <Container className='manage-routines container'>
        <Row>
          <Col lg='8' md='12' className="routines-column">
            <h2>Your Routines:</h2>
            <div className="options-menu">
                <Button onClick={handleNewClick} variant='primary' id='new-routine' aria-current="page"><FaPlus /> New</Button>
            </div> 
            <RoutinesAccordion />
          </Col>
        </Row>
      </Container>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  clearCurrentRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoutinesPage)


