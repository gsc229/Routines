import React, {useState} from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import SetGroupForm from '../../4_Components/form_set_group/SetGroupForm'
import SearchExercisesFrom from '../../4_Components/form_search_exercises/SearchExercisesForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ExerciseForm from '../../4_Components/form_exercise/ExerciseForm'

export const CreateOrEditExerciseSet = (props) => {

  const [searchMode, setSearchMode] = useState("exercise")

  return (
    <Layout>
      <Container>
        <h1>Create Or Edit Set Group Page</h1>
        <ul>
          TO DO:
          <li>Deterine if the Set Group already has a set group id...if not</li>
          <li>Initiate Set Group in State with routine, week, user ids and week_number and day_number</li>
          <li>Create Actions for Creating Set Group AFTER first excercise is chosen</li>
          <li>Retrun to ManageCurrentRoutinePage</li>
        </ul>
        <SetGroupForm />
        <Tabs
          id="controlled-tab-example"
          activeKey={searchMode}
          onSelect={(mode) => setSearchMode(mode)}>
          <Tab eventKey="exercise" title="Search Exercise">
            <SearchExercisesFrom />
          </Tab>
          <Tab eventKey="set" title="My Saved Sets">
            Find a set
          </Tab>
          <Tab eventKey="new-exercise" title="Create New Exercise">
            <ExerciseForm />
          </Tab>
        </Tabs>

      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  set_groups: state.weekReducer.set_groups
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExerciseSet)
