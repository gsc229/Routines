import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {FaPlus} from 'react-icons/fa'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import Calendar from '../../4_Components/calendar/Calendar'

export const ManageRoutines = ({userRoutines}) => {
  console.log({userRoutines})

  const [opnedId, setOpenedId] = useState("")

  const handleOpen = (id) => {
    if(id === opnedId){
      return setOpenedId("")
    } 

    setOpenedId(id)
  }

  return (
    <LayoutOne showTop={false}>
      <div className='container manage-routines'>
        <h1>Manage Routines</h1>
        <div className='row routines-and-stats-container'>
          <div className='col-xl-3 routines-container'>
            <div className="options-menu">
                <button id='new-routine' className="btn btn-outline-success" aria-current="page"><FaPlus /> New</button>
            </div>            
            <div className="routines-bank">
              {userRoutines && userRoutines.map(routine=>
                <div key={routine._id} className={`in-bank-routine ${opnedId === routine._id ? 'opened' : ''}`} >
                  
                  <button
                    onClick={() => handleOpen(routine._id)}
                    className="btn btn-outline-secondary routine-bank-btn" 
                    data-bs-toggle="collapse"
                    data-bs-target={`#${routine._id}`} 
                    aria-expanded='false'
                    aria-controls={`${routine._id}`}>
                       {routine.name}
                  </button>
                  
                  <div 
                  id={`${routine._id}`}
                  className={`collapse ${opnedId === routine._id ? "show" : ''}`}>
                    <ul className='list-group'>
                      <li>{routine.category ? routine.category : 'none chosen'}</li>
                      <li>{routine.category ? routine.category : 'none chosen'}</li>
                      <li>{routine.category ? routine.category : 'none chosen'}</li>
                      <li>{routine.category ? routine.category : 'none chosen'}</li>
                      <li>{routine.category ? routine.category : 'none chosen'}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-9 stats-container">
            <Calendar calendarId='manage-routines-calendar' />
          </div>
        </div>
      </div>
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  userRoutines: state.routineReducer.userRoutines
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoutines)


