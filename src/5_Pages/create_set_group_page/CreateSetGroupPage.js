import React, {useState} from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CreateSetGroup from '../../4_Components/create_set_group/CreateSetGroup'
import SetGroupChosenExercises from '../../4_Components/create_set_group/SetGroupChosenExercises'

export const CreateOrEditExerciseSet = ({
  exerciseSearchResults
}) => {

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
        <SetGroupChosenExercises />
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
  exerciseSearchResults: state.exerciseReducer.exerciseSearchResults
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExerciseSet)
