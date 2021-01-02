import React from 'react'
import {Link} from 'react-router-dom'
import {Droppable} from 'react-beautiful-dnd'
import Card from 'react-bootstrap/Card'
import DraggableSetGroup from './DraggableSetGroup'

export const DroppableDay = ({
  weekNumber,
  dayNumber, 
  name, 
  routineSchedule, 
  setCurrentWeek,
  currentRoutine
  }) => {


    const dayKey = {
      1: "Su",
      2: "Mo",
      3: "Tu",
      4: "We",
      5: "Th",
      6: "Fr",
      7: "Sa"
    }

  return (
    <Droppable 
    key={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}
    droppableId={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}>
    {(provided, snapshot) => {
      return(
        <Card
        {...provided.droppableProps}
        ref={provided.innerRef}                       
        className={`day-container-card ${snapshot.isDraggingOver && 'day-container-card-hovering'}`}>
          <Card.Header>
            <div
            className='day-header'>
              <h6>{dayKey[dayNumber]}</h6>
              <Link 
              onClick={() => setCurrentWeek(routineSchedule[weekNumber])}
              to={
                `/create-set-group/${currentRoutine.slug ? currentRoutine.slug : currentRoutine.name}/week-${routineSchedule[weekNumber].week_number}/day-${dayNumber}-${dayKey[dayNumber]}`}>
                Add Sets
              </Link>
            </div>
          </Card.Header>
            <Card.Body>
              {routineSchedule[weekNumber][dayNumber].set_groups.map((set_group, index) => {
                return (
                <DraggableSetGroup 
                  key={set_group._id}  
                  index={index}
                  set_group={set_group} />)
              })}
            {provided.placeholder}
            </Card.Body>
        
      </Card>)
    }}
    </Droppable>
  )
}



export default DroppableDay
