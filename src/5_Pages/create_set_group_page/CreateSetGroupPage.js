import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {fullResetCreateSetGroup, saveSetGroupChanges, createNewSetGroup} from '../../1_Actions/setGroupActions'
import {useHistory} from 'react-router-dom'
import {FaRegHandPointLeft, FaRegCalendarAlt} from 'react-icons/fa'
import {numberToDay} from '../../4_Components/dnd_routine_schedule/schedule_helpers/routineScheduleConstructor'
import Container from 'react-bootstrap/Container'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import CreateSetGroupSteps from '../../4_Components/create_set_group/1_create_set_group_steps/CreateSetGroupSteps'
import FindSavedSetGroup from '../../4_Components/saved_set_groups/FindSavedSetGroup'
import ModalLayoutOne from '../../4_Components/modals/modal_layout_one/ModalLayoutOne'
import Link from 'react-bootstrap/NavLink'
import {FaRegHandPointRight} from 'react-icons/fa'

export const CreateOrEditExerciseSet = ({
  currentRoutine,
  fullResetCreateSetGroup,
  currentSetGroup,
  currentRoutineSetGroups,
  createNewSetGroup,
  saveSetGroupChanges
}) => {

  const history = useHistory()
  const [searchMode, setSearchMode] = useState("exercise")
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  const persistedSetGroup = currentRoutineSetGroups.find(sg => sg._id === currentSetGroup._id)

  const returnToSchedule = () => {
    fullResetCreateSetGroup()
    history.push(`/view-routine/${currentRoutine._id}/${currentRoutine.name}`)
  }

  const modalShowLogic = () => {

    if(persistedSetGroup){
      if(persistedSetGroup.name !== currentSetGroup.name || persistedSetGroup.set_group_type !== currentSetGroup.set_group_type){
        setModalShow(true)
      } else{
        returnToSchedule()
      }
    }


    if(!persistedSetGroup || !currentSetGroup._id){
      currentSetGroup.name ? setModalShow(true) : returnToSchedule()
    }

  }

  const modalHeader = () => <h5>Confirm Navigate</h5>


  const modalBody = () => {


    if(!persistedSetGroup || !currentSetGroup._id){
      return <p>You have not yet saved this set group.</p>
    } else{
      const changes = {
        type: persistedSetGroup.set_group_type !== currentSetGroup.set_group_type ? <p><span>Set Group Type:</span><br/> {persistedSetGroup.set_group_type} <FaRegHandPointRight /> {currentSetGroup.set_group_type}</p> : null,
        name: persistedSetGroup.name !== currentSetGroup.name ? <p><span>Set Group Name:</span><br/> {persistedSetGroup.name} <FaRegHandPointRight /> {currentSetGroup.name}</p> : null,
      }
      return (
        <div>
          <p>You have unsaved changes:</p>
          <ul style={{listStyle: 'none'}}>
            {changes.name && 
            <li>{changes.name}</li>}
            {changes.type && 
            <li>{changes.type}</li>}
          </ul>
        </div>
      )
    }
    
  
  }
  const modalFooter = () => {

    const saveAndContinue = async () => {
      if(currentSetGroup._id){
        saveSetGroupChanges(currentSetGroup._id, currentSetGroup)
        returnToSchedule()
      }

      if(!currentSetGroup._id){
        await createNewSetGroup(currentSetGroup)
        returnToSchedule()
      }
    }

    return(
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Button onClick={returnToSchedule}>Continue Without Save</Button>
        <Button 
        onClick={saveAndContinue}
        variant='success'>Save and Continue</Button>
      </div>
    )
  }

  return (
    <Layout>
      <Container className='page create-setgroup-page-container'>
        <ModalLayoutOne
        className='create-set-group-navigate-modal'
        header={modalHeader()} 
        body={modalBody()}
        footer={modalFooter()}
        onHide={() => setModalShow(false)}
        show={modalShow}/>
        <div className='create-set-group-page-header'>
          <h2>Create Set Group for {currentRoutine.name}</h2>
          <h6>Week {currentSetGroup.week_number}, Day {currentSetGroup.day_number}</h6>
          <Link 
          onClick={modalShowLogic}>
            <FaRegCalendarAlt /><FaRegHandPointLeft /> return to schedule
          </Link>
        </div>
        <Tabs
          className='create-set-group-tabs'
          id="create-set-group-tabs"
          activeKey={searchMode}
          onSelect={(mode) => setSearchMode(mode)}>
          <Tab eventKey="exercise" title="Create A New Set Group">
            <CreateSetGroupSteps />
          </Tab>
          <Tab eventKey="set" title="Use A Saved Set Group">
            <FindSavedSetGroup />
          </Tab>
        </Tabs>

      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  exerciseSearchResults: state.exerciseReducer.exerciseSearchResults,
  currentRoutine: state.routineReducer.currentRoutine,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentRoutineSetGroups: state.setGroupReducer.currentRoutineSetGroups
})

const mapDispatchToProps = {
  fullResetCreateSetGroup,
  createNewSetGroup,
  saveSetGroupChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditExerciseSet)
