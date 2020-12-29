import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Layout from '../../6_Layouts/layout_one/LayoutOne'
import Container from 'react-bootstrap/Container'
import RoutineInfoForm from '../../4_Components/routine/form_routine/RoutineInfoForm'
import DarkSpinner from '../../4_Components/spinners/DarkSpinner'

const CreateRoutine = ({currentIsSaved, crudingRoutine}) => {

  // TO DO: if current is saved redirect to editing url
  const [showSpinner, setshowSpinner] = useState(false)


  useEffect(() => {
    if(crudingRoutine === 'updating'){
      setshowSpinner(true)
    }
  }, [crudingRoutine])

 
  if(showSpinner){
    setTimeout(() => {
      setshowSpinner(false)
    }, 800)
  }

  return (
    <Layout>
      <Container>
        {!showSpinner && !crudingRoutine && 
        <RoutineInfoForm />}
        {(showSpinner || crudingRoutine )&& 
        <DarkSpinner />}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  currentIsSaved: state.routineReducer.currentIsSaved, 
  crudingRoutine: state.routineReducer.crudingRoutine 
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoutine)
