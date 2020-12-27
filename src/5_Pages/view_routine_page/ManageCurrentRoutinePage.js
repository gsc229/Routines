import React from 'react'
import { connect } from 'react-redux'
import {fetchRoutineById} from '../../1_Actions/routineActions'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineWeeksBank from '../../4_Components/bank_weeks/RoutineWeeksBank'
import {FiRefreshCcw} from 'react-icons/fi'

export const ViewRoutinePage = ({currentRoutine, fetchRoutineById}) => {

  const currentRoutineRefreshQuery = `?populate_one=weeks&populate_two=set_groups&populate_three=exercise_sets&populate_four=exercise`

  return (
    <Layout>
      <Container className='view-routine-container'>
        <h5>Managing Routine: {currentRoutine.name || 'id' + currentRoutine._id}</h5>
        <FiRefreshCcw style={{color: 'limegreen'}} onClick={() => fetchRoutineById(currentRoutine._id,currentRoutineRefreshQuery)} />
        <div style={{height: '150px', border: '1px solid green'}} className="set-group-bank">
          <h6>Set Groups Go Here</h6>
          <button className="btn btn-success">Create Set Group</button>
        </div>
        <RoutineWeeksBank />

        {JSON.stringify(currentRoutine,'', 2)}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  fetchRoutineById
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoutinePage)
