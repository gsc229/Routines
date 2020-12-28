import React from 'react'
import { connect } from 'react-redux'
import {getExSetTarget} from './setGroupHelpers'
import Card from 'react-bootstrap/Card'
import {BsGrid3X3Gap} from 'react-icons/bs'

export const SetGroup = ({set_group, isDragging}) => {
  const exercise_sets = set_group.exercise_sets

  return (
    <Card
    bg={!isDragging &&  'dark'}
    text={!isDragging && 'white'}
    style={{margin: '5px auto', cursor: 'grab'}}
    className={`set-group-schedule-card`}>
    <div 
    style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',  
      width: '95%', 
      margin: 'auto',
      }}>
      <p style={{position: 'relative', top: '7px' }} >{set_group.name ? set_group.name : 'no name'}</p>
      <BsGrid3X3Gap />
    </div>

      
    </Card>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroup)
