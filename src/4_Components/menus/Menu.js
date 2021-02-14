import React from 'react'
import {connect} from 'react-redux'
import { clearCurrentRoutine } from '../../1_Actions/routineActions'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {logout} from '../../1_Actions/userActions'
import {Link, useLocation} from 'react-router-dom'

const Menu = ({logout, clearCurrentRoutine}) => {
  
  const pathname = useLocation().pathname
  
  function isActivePath(path){
   return path === pathname || (path === 'dropdown' && (pathname === '/my-routines' || pathname === '/create-routine' || pathname === '/find-routine'))
  }

  return (
    <div className="menu main-menu" style={{marginBottom: '56px'}}>
      <Navbar fixed='top' expand="lg"  variant='dark' bg='dark'/* bg="dark" variant="dark" */>
        <Navbar.Brand as={Link} to="/">
          Routines
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
        <Nav>
          <Nav.Link active={isActivePath('/schedule')} as={Link} to='/schedule'>Workout Schedule</Nav.Link>
          {/* <Nav.Link active={isActivePath('/goals')} as={Link} to="/goals">Goals</Nav.Link> */}
          {/* <Nav.Link active={isActivePath('/manage-routines')} as={Link} to="/manage-routines">Manage Routines</Nav.Link> */}
          <NavDropdown active={isActivePath('dropdown')} title='Manage' aria-labelledby="navbarDropdown">
            <NavDropdown.Item active={isActivePath('/manage-routines')} as={Link} to="/manage-routines">Saved Routines</NavDropdown.Item>
            <NavDropdown.Item onClick={clearCurrentRoutine} active={isActivePath('/create-routine')} as={Link} to="/create-routine">New Routine</NavDropdown.Item>
            {/* <NavDropdown.Item active={isActivePath('/find-routine')} as={Link} to="/find-routine">Find Routines</NavDropdown.Item> */}
            <NavDropdown.Item><hr className="dropdown-divider" /></NavDropdown.Item>
            <NavDropdown.Item active={isActivePath('/manage-exercises')} as={Link} to="/manage-exercises">My Exercises</NavDropdown.Item>
            <NavDropdown.Item active={isActivePath('/browse-exercises')} as={Link} to="/browse-exercises">Browse Exercises</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} onClick={logout} className="nav-Nav.link" to="/">Log Out</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  logout,
  clearCurrentRoutine
}

export default connect( mapStateToProps, mapDispatchToProps)(Menu)
