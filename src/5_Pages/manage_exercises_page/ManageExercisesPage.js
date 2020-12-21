import React from 'react'
import { connect } from 'react-redux'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'

export const ManageExercisesPage = () => {
  return (
    <LayoutOne>
      <div className="container manage-exercises">
        <h1>ManageExercisesPage</h1>
      </div>  
    </LayoutOne>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageExercisesPage)
