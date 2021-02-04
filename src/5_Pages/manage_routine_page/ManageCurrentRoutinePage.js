import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {windowScrollTop} from '../../utils/windowScroll'
import {fetchFlattenedRoutine} from '../../1_Actions/routineActions'
import {createNewWeek, setSelectedWeekNumbers} from '../../1_Actions/weekActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import RoutineScheduleDnd from '../../4_Components/dnd_routine_schedule/RoutineScheduleDnd'
import Button from 'react-bootstrap/Button'
import {FiRefreshCcw} from 'react-icons/fi'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'
import WeekSelector from '../../4_Components/dnd_routine_schedule/WeekSelector'
import fontSizeClamp from '../../utils/clampBuilder'

export const ViewRoutinePage = ({
  currentRoutine, 
  currentWeeks,
  crudingRoutine,
  fetchFlattenedRoutine, 
  createNewWeek,
  userId,
  setSelectedWeekNumbers
}) => {
  
  const handleRefresh = () => {
    fetchFlattenedRoutine(currentRoutine._id)
  }

  useEffect(() => {
    windowScrollTop()
  }, [])
  
  const addWeek = async () => {
    const credentials = {
      user: userId,
      routine: currentRoutine._id,
      week_number: currentWeeks.length + 1
    }
    createNewWeek(credentials)

  }

  const noWeeksMessage = () => {
    return currentWeeks && !currentWeeks.length > 0 && !crudingRoutine &&
      <div className='no-weeks-message'>
        <p>You don't currently have anything scheduled for this routine.<br/>Start by adding a week: </p>
        <Button
        className='add-week-btn' 
        onClick={addWeek}
        variant='primary'>
          Add Week
        </Button>
      </div>
  }

  const showWeeks = () => {
    return currentWeeks && currentWeeks.length > 0 && !crudingRoutine &&
      <div>
        
        <RoutineScheduleDnd />
      </div>
  }


  return (
    <Layout>
      <Container className='page manage-current-routine-page-container'>
      <div 
        fixed='top'
        className='manage-current-routine-page-header'>
        <div className='header-inner'>
            <div 
            style={{fontSize: fontSizeClamp(400, 1000, 1.2, 1.5)}}
            className='title-container'>
              <h2 style={{fontSize: 'inherit'}} >Managing Routine:</h2>
              <h2 style={{fontSize: 'inherit', color: currentRoutine.color || 'var(--routine-red)'}} >
               {currentRoutine.name} &nbsp;
              <FiRefreshCcw style={{color: 'limegreen', cursor: 'pointer'}} onClick={handleRefresh} />
              </h2>
            </div>
            <Nav
            className='search-nav'>
              <Nav.Item>
              <WeekSelector 
              setSelectedWeekNumbers={setSelectedWeekNumbers}
              currentWeeks={currentWeeks}/>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        

        {showWeeks()}
        {noWeeksMessage()}
        {crudingRoutine && <DarkSpinner text='Loading schedule...' />}
        
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  crudingRoutine: state.routineReducer.crudingRoutine,
  currentRoutine: state.routineReducer.currentRoutine,
  currentWeeks: state.weekReducer.currentWeeks,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  fetchFlattenedRoutine,
  createNewWeek,
  setSelectedWeekNumbers
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoutinePage)
