import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { Route, useLocation, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import moment from 'moment'
import {clearCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {windowScrollTop} from '../../utils/windowScroll'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import CurrentSetGroups from '../../4_Components/execute_sets/CurrentSetGroups'
import ExecuteSet from '../../4_Components/execute_sets/ExecuteSet'
import {PointLeftIcon, CalendarIcon} from '../../4_Components/icons/Icons'

export const ExecuteSetsPage = ({
  userRoutines,
  currentSetGroup,
  currentSetGroups
}) => {

  const location = useLocation()
  const history = useHistory()
  const {setDate} = useParams()
  const match = useRouteMatch()
  const daysDate = moment(setDate, 'MM-DD-YYYY').format('MMMM DD, YYYY')
  const [currentPage, setCurrentPage] = useState('all-set-groups')

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
      <div 
      style={{color: 'var(--spanish-gray)'}}
      className="days-date-container">
        <p>{daysDate}</p>
      </div>

      <div className='page-navs'>
        <div 
        onClick={() => history.push(`/schedule`)}  
        className="back-to-container back-to-schedule-container">
          <CalendarIcon />
          &nbsp; Schedule
        </div>
  
        {currentPage === 'execute-set' && 
        <div 
        onClick={() => history.push(`/execute-sets/${setDate}`)}  
        className="back-to-container back-to-set-groups-container">
          <PointLeftIcon />
          &nbsp;All Set Groups for this Day
        </div>}
      </div>

      {match.url === location.pathname && <CurrentSetGroups setCurrentPage={setCurrentPage} />}

      {currentSetGroup.name && 
      <Route 
      exact 
      path='/execute-sets/:setDate/:routineName/:setGroupId/:exerciseName/:order' 
      render={() => <ExecuteSet setCurrentPage={setCurrentPage} />}  
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
