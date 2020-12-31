import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {FaRegHandPointLeft, FaRegCalendarAlt} from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CreateSetGroup from '../../4_Components/set_group/create_set_group/CreateSetGroup'

export const CreateOrEditExerciseSet = ({
  exerciseSearchResults,
  currentRoutine
}) => {

  const [searchMode, setSearchMode] = useState("exercise")

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
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExerciseSet)
