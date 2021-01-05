import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

export const ExerciseSetCard = ({
  exerciseSet, 
  setNumber
}) => {

  console.log(Object.keys(exerciseSet))


  return (
    <Card
    className="mb-2 exercise-set-card"
    bg="dark"
    text='white'>
    <Card.Header>
    <Card.Title>
      <div className='card-title-container'>
        <div className='exercise-name'>{exerciseSet.exercise.name}</div>
        <div className="set-number"><i>Set: {setNumber}</i></div>
      </div>
    </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Subtitle>
      <div className='target-and-actual-container'>
        <ul style={{listStyle: 'none', padding: 0}}>
          {Object.keys(exerciseSet).map(key=> {
          if(key.includes('target') && exerciseSet[key]){
            return (
            <li>
              {key.split("_").join(" ").toUpperCase()}: {exerciseSet[key]} <br/>
            </li>)
          }})}
        </ul>
        <ul style={{listStyle: 'none', padding: 0}}>
          {Object.keys(exerciseSet).map(key=> {
          if(key.includes('target') && exerciseSet[key]){
            const actual_result = key.replace('target', 'actual')
            return (
            <li>
              {actual_result.split("_").join(" ").toUpperCase()}:&nbsp;
              {exerciseSet[actual_result] ? exerciseSet[actual_result] : <i>not recorded</i>}
            </li>)
          }})}
        </ul>

      </div>
      </Card.Subtitle>
      
    
    </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSetCard)
