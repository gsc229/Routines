import React, { Component } from 'react'
import { connect } from 'react-redux'

export const CreateExercise = () => {
  return (
    <div>
      <h2>Create New Exercise</h2>
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExercise)
