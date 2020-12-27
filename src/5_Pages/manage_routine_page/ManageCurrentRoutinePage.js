import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {fetchRoutineById, fetchRoutines} from '../../1_Actions/routineActions'
import {createNewWeek} from '../../1_Actions/weekActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineWeeksBank from '../../4_Components/bank_weeks/RoutineWeeksBank'
import Button from 'react-bootstrap/Button'
import {FiRefreshCcw} from 'react-icons/fi'

export const ViewRoutinePage = ({
  currentRoutine, 
  fetchRoutineById, 
  createNewWeek,
  userId
}) => {

  const currentRoutineRefreshQuery = `?populate_one=weeks&populate_two=set_groups&populate_three=exercise_sets&populate_four=exercise`
  
  const handleRefresh = () => {
    fetchRoutineById(currentRoutine._id, currentRoutineRefreshQuery)
  }

  useEffect(() => {
    alert('Fetching routine by id')
    fetchRoutineById(currentRoutine._id, currentRoutineRefreshQuery)
  }, [createNewWeek])

  const addWeek = async () => {
    const credentials = {
      user: userId,
      routine: currentRoutine._id,
      week_number: currentRoutine.weeks.length + 1
    }
    console.log({credentials})
    createNewWeek(credentials)

  }

  const noWeeksMessage = () => {

    if(!currentRoutine.weeks.length){
      return(
        <div className='no-weeks-message'>
          <p>You don't currently have any weeks for this routine.<br/>Start by adding a week: </p>
          <p> </p>
        </div>
      )
    }    
  }

  const showWeeks = () => {
    if(currentRoutine.weeks.length){
      return (
        <div>
          <FiRefreshCcw style={{color: 'limegreen'}} onClick={handleRefresh} />
          <RoutineWeeksBank />
        </div>
      )
    } 
  }


  return (
    <Layout>
      <Container className='view-routine-container'>
        <h5>Managing Routine: {currentRoutine.name || 'id' + currentRoutine._id}</h5>
        {showWeeks()}
        {noWeeksMessage()}
        <Button 
        onClick={addWeek}
        variant='primary'>Add Week</Button>
        {JSON.stringify(currentRoutine,'', 2)}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine,
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  fetchRoutineById,
  createNewWeek
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoutinePage)
