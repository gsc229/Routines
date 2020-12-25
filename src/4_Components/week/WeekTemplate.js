import React, {useState} from 'react'
import { connect } from 'react-redux'
import {DragDropContext,  Droppable} from 'react-beautiful-dnd'
import {weekConstructor} from './weekConstructor'
import {weekExercises} from './weekObj'
import {onDragEnd} from './routineWeekHelpers'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const WeekTemplate = (props) => {

  const days = ["Su","Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const [columns, SetColumns] = useState(weekExercises)

  return (
    <Container>
      <DragDropContext>

      </DragDropContext>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekTemplate)
