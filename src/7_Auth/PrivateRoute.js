import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

export const PrivateRoute = ({loggedIn, component: Component, ...rest}) => {
  return (
    <Route 
        {...rest} render={props => loggedIn ? 
          (<Component {...props} />) :  
          (<Redirect to={{pathname: '/signin', state: {from: props.location}}} />)
        }
      />
    )
}

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
