import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

export const SetGroupCard = ({
  setGroup,
  setCurrentSetGroup,
  onClick,
  routineNamesColors
}) => {

  const backgroundColor = routineNamesColors[setGroup.routine].color ? routineNamesColors[setGroup.routine].color : 'var(--routine-red)'


  return (
    <Card
    style={{backgroundColor: 'var(--jet)', padding: '5px'}}
    onClick={onClick}
    className='set-group-card'>
      <Card.Header style={{backgroundColor}}>
        <h6>{setGroup.name}</h6>
      </Card.Header>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  routineNamesColors: state.routineReducer.routineNamesColors
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupCard)
