import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

export const SetGroupCard = ({
  setGroup,
  onClick,
  routineNamesColorsStartDates
}) => {

  const color = routineNamesColorsStartDates[setGroup.routine].color ? routineNamesColorsStartDates[setGroup.routine].color : 'var(--routine-red)'


  return (
    <Card
    style={{borderColor: color}}
    onClick={onClick}
    className='set-group-card'>
      <Card.Header 
      style={{color}}>{routineNamesColorsStartDates[setGroup.routine].name}</Card.Header>
      <Card.Body>
        <h6>{setGroup.name}</h6>
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  routineNamesColorsStartDates: state.routineReducer.routineNamesColorsStartDates
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupCard)
