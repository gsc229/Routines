import React from 'react'
import {Link, useHistory, useLocation, useParams} from 'react-router-dom'


const activeStyle = {
  color: 'rgb(160, 14, 14)'
}


const LandingMenu = () => {

  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const isActiveTab = (pathname) => {
    return location.pathname === pathname ? { active: true, style: activeStyle} : {active: false, style: {}}
  }

  console.log({params, location, history})
  return (
    <div className="menu">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link style={{...isActiveTab('/').style, fontWeight: 'bold'}} className="navbar-brand" to="/">Routines</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">              
              <li className="nav-item">
                <Link style={isActiveTab('/signin').style} className="nav-link" to="/signin">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link style={isActiveTab('/signup').style} className="nav-link" to="/signup">Create Account</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default LandingMenu
