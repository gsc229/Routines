import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {writingCreateSetGroupData, writingSetGroup} from '../../1_Actions/setGroupActions'
import {Link} from 'react-router-dom'
import {FaRegHandPointLeft, FaRegCalendarAlt} from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CreateSetGroup from '../../4_Components/set_group/create_set_group/CreateSetGroup'

export const CreateOrEditExerciseSet = ({
  currentRoutine,
  writingSetGroup,
  userId,
  currentWeek
}) => {

  const [searchMode, setSearchMode] = useState("exercise")

  useEffect(() => {
    writingSetGroup('routine', currentRoutine._id)
    writingSetGroup('user', userId)
    writingSetGroup('week', currentWeek._id)
    writingSetGroup('week_number', currentWeek.number)
  }, [])

  return (
    <Layout>
      <Container>
        <div className='create-set-group-page-header'>
          <h2>Create Set Group for {currentRoutine.name}</h2>
          <Link to={`/view-routine/${currentRoutine._id}/${currentRoutine.name}`}>
            <FaRegCalendarAlt /><FaRegHandPointLeft /> return to schedule
          </Link>
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={searchMode}
          onSelect={(mode) => setSearchMode(mode)}>
          <Tab eventKey="exercise" title="Create A New Set Group">
            <CreateSetGroup />
          </Tab>
          <Tab eventKey="set" title="Use A Saved Set Group">
            Find a set
          </Tab>
        </Tabs>

      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  set_groups: state.weekReducer.set_groups,
  exerciseSearchResults: state.exerciseReducer.exerciseSearchResults,
  currentRoutine: state.routineReducer.currentRoutine,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  userId: state.userReducer.user._id,
  currentWeek: state.weekReducer.currentWeek
})

const mapDispatchToProps = {
  writingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExerciseSet)
