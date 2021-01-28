import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Route, useLocation, useHistory } from 'react-router-dom'
import {clearCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {windowScrollTop} from '../../utils/windowScroll'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import CurrentSetGroups from '../../4_Components/execute_sets/CurrentSetGroups'
import ExecuteSet from '../../4_Components/execute_sets/ExecuteSet'

export const ExecuteSetsPage = ({
  userRoutines,
  currentSetGroup,
  currentSetGroups
}) => {

  const location = useLocation()
  const history = useHistory()
  
  useEffect(() => {
    windowScrollTop()
    clearCurrentSetGroup()
    // Redirect to schedule if...
    // no currentSetGroups
    if(!currentSetGroups.length){
      return history.push('/schedule')
    }
    // the test of the routine of the first current set group fails to show an array of exercise sets 
    const routinesAreFlattend = userRoutines.find(routine => routine._id === currentSetGroups[0].routine).exercise_sets

    if(!routinesAreFlattend){
      return history.push('/schedule')
    }
  }, [])

  return (
      <LayoutOne showTop={false}>
        <Container 
        className='page execute-sets-page'>
          {location.pathname === '/execute-sets' && <CurrentSetGroups />}
          {currentSetGroup.name && 
          <Route 
          exact 
          path='/execute-sets/:routineName/:setGroupId/:exerciseName/:order' 
          render={() => 
            <ExecuteSet />}  
          />}
        </Container>
      </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentSetGroups: state.setGroupReducer.currentSetGroups
})

const mapDispatchToProps = {
  clearCurrentSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSetsPage)
