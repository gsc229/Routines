import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { isDemo } from '../../config/config'

const activeStyle = {
  color: 'rgb(160, 14, 14)'
}


const LandingMenu = () => {
  const location = useLocation()

  const isActiveTab = (pathname) => {
    return location.pathname === pathname ? { active: true, style: activeStyle} : {active: false, style: {}}
  }
  return (
    <div className="menu" style={{marginBottom: '56px'}}>
      <Navbar fixed='top' expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={isActiveTab('/').style} as={Link} to="/">Routines</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
        <Nav className='ml-auto'>
          <Nav.Link style={isActiveTab('/signin').style} active={isActiveTab('/signin').active} as={Link} to='/signin'>Sign In</Nav.Link>
          {!isDemo && <Nav.Link style={isActiveTab('/signup').style} active={isActiveTab('/signup').active} as={Link} to="/signup">Create Account</Nav.Link>}
          
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default LandingMenu