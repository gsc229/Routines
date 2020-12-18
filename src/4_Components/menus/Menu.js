import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const Menu = () => {
  
  const pathname = useLocation().pathname

  function isActivePath(){
    if(pathname === "/my-routines" || pathname === "/create-routine" || pathname === "/find-routine" || pathname === "/browse-exercises" ){
      return "active"
    }

    return ""
  }

  return (
    <div className="menu">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Routines</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/schedule">Schedule</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/goals">Goals</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-routines">Manage Routines</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-exercises">Manage Exercises</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/routines-dnd">Routines DnD</Link>
              </li>
              <li className={`${isActivePath()} nav-item dropdown`}>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Workout Routines
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/my-routines">My Saved Routines</Link></li>
                  <li><Link className="dropdown-item" to="/create-routine">Create New Routine</Link></li>
                  <li><Link className="dropdown-item" to="/find-routine">Find Routines</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/browse-exercises">Browse Exercises</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Menu
