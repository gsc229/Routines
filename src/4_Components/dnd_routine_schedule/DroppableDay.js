import React from 'react'
import { connect } from 'react-redux'
import {fullResetCreateSetGroup, localWritingSetGroup} from '../../1_Actions/setGroupActions'
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
  currentRoutine,
  fullResetCreateSetGroup,
  localWritingSetGroup,
  userId
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

  const dayKeyLong = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday"
  }

  const handleAddSetsClick = () => {
    fullResetCreateSetGroup()
    setCurrentWeek(routineSchedule[weekNumber])
    localWritingSetGroup('routine', currentRoutine._id)
    localWritingSetGroup('user', userId)
    localWritingSetGroup('week', routineSchedule[weekNumber]._id)
    localWritingSetGroup('week_number', weekNumber)
    localWritingSetGroup('day_number', name.day_number)
    localWritingSetGroup('day', name.day_name)
  }

  return (
    <Droppable 
    key={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}
    droppableId={`${weekNumber}-${dayNumber}-${routineSchedule[weekNumber]._id}-${name.day_name}`}>
    {(provided, snapshot) => {
      return(
        <Card              
        className={`day-container-card ${snapshot.isDraggingOver && 'day-container-card-hovering'}`}>
          <Card.Header>
            <div
            className='day-header'>
              <h6>{dayKeyLong[dayNumber]} &nbsp;&nbsp;W: {weekNumber}</h6>
              <Link 
              onClick={handleAddSetsClick}
              to={
                `/create-set-group/${currentRoutine.slug ? currentRoutine.slug : currentRoutine.name}/week-${routineSchedule[weekNumber].week_number}/day-${dayNumber}-${dayKey[dayNumber]}`}>
                Add Sets
              </Link>
            </div>
          </Card.Header>
            <Card.Body
            {...provided.droppableProps}
            ref={provided.innerRef}  
            >
              {routineSchedule[weekNumber][dayNumber].set_groups.map((set_group, index) => {
                return (
                <DraggableSetGroup
                  key={set_group._id}  
                  index={index}
                  weekNumber={weekNumber}
                  dayNumber={dayNumber}
                  set_group={set_group} />)
              })}
            {provided.placeholder}
            </Card.Body>
        
      </Card>)
    }}
    </Droppable>
  )
}

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  fullResetCreateSetGroup,
  localWritingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(DroppableDay)
