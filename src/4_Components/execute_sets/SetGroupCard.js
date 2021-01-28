import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

export const SetGroupCard = ({
  setGroup,
  onClick,
  routineNamesColors
}) => {

  const color = routineNamesColors[setGroup.routine].color ? routineNamesColors[setGroup.routine].color : 'var(--routine-red)'


  return (
    <Card
    style={{borderColor: color}}
    onClick={onClick}
    className='set-group-card'>
      <Card.Header 
      style={{color}}>{routineNamesColors[setGroup.routine].name}</Card.Header>
      <Card.Body>
        <h6>{setGroup.name}</h6>
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  routineNamesColors: state.routineReducer.routineNamesColors
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupCard)
