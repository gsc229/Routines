import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

export const SetGroupCard = ({
  setGroup,
  setCurrentSetGroup,
  onClick

}) => {
  return (
    <Card
    onClick={onClick}
    className='set-group-card'>
      <Card.Header>
        <h6>{setGroup.name}</h6>
      </Card.Header>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupCard)
