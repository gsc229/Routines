import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

export const SetGroupCard = ({
  setGroup,
  setCurrentSetGroup,
  onClick,
  routineNamesColors
}) => {

  const color = routineNamesColors[setGroup.routine].color ? routineNamesColors[setGroup.routine].color : 'var(--routine-red)'


  return (
    <Card
    onClick={onClick}
    className='set-group-card'>
      <Card.Header style={{color, backgroundColor: 'var(--bs-dark)'}}>{routineNamesColors[setGroup.routine].name}</Card.Header>
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
