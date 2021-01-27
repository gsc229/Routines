import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Route, useLocation } from 'react-router-dom'
import {clearCurrentSetGroup} from '../../1_Actions/setGroupActions'
import {windowScrollTop} from '../../utils/windowScroll'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import CurrentSetGroups from '../../4_Components/execute_sets/CurrentSetGroups'
import ExecuteSet from '../../4_Components/execute_sets/ExecuteSet'

export const ExecuteSetsPage = ({
  currentSetGroup
}) => {

  const match = useLocation()

  useEffect(() => {
    windowScrollTop()
    clearCurrentSetGroup()
  }, [])

  return (
      <LayoutOne showTop={false}>
        <Container 
        className='page execute-sets-page'>
          {match.pathname === '/execute-sets' && <CurrentSetGroups />}
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
  currentSetGroup: state.setGroupReducer.currentSetGroup
})

const mapDispatchToProps = {
  clearCurrentSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteSetsPage)
