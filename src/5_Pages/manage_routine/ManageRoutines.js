import React from 'react'
import { connect } from 'react-redux'
import {FaPlus} from 'react-icons/fa'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Calendar from '../../4_Components/calendar/Calendar'
import './manage_routines.scss'


const routines = [
  {
    name: "Legs Routine"
  },
  {
    name: "Back Routine"
  },
  {
    name: "Chest Routine"
  }
]


export const ManageRoutines = () => {
  return (
    <LayoutOne showTop={false}>
      <div className='container manage-routines'>
        <h1>Manage Routines</h1>
        <div style={{height: '500px'}} className='routines-and-stats-container'>
          <div className='col-sm-6 routines-container'>
            <div className="options-menu">
              <nav className="nav">
                <button className="btn btn-outline-success nav-link" aria-current="page" href="#"><FaPlus /> New</button>
              </nav>
            </div>            
            <div className="routines-bank">
              routines bank

            </div>
          </div>
          <div className="col-sm-6 stats-container">
            <Calendar calendarId='manage-routines-calendar' />
          </div>
        </div>
      </div>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoutines)
