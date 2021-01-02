import React from 'react'
import { connect } from 'react-redux'
import {clearCreateSetGroupData, writingSetGroup} from '../../1_Actions/setGroupActions'
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
  clearCreateSetGroupData,
  writingSetGroup,
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

  console.log({weekNumber, dayNumber, name, routineSchedule, currentRoutine})

  const handleAddSetsClick = () => {
    clearCreateSetGroupData()
    setCurrentWeek(routineSchedule[weekNumber])
    writingSetGroup('routine', currentRoutine._id)
    writingSetGroup('user', userId)
    writingSetGroup('week', routineSchedule[weekNumber]._id)
    writingSetGroup('week_number', weekNumber)
    writingSetGroup('day_number', name.day_number)
    writingSetGroup('day', name.day_name)
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
              onClick={handleAddSetsClick}
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

const mapStateToProps = (state) => ({
  userId: state.userReducer.user._id
})

const mapDispatchToProps = {
  clearCreateSetGroupData,
  writingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(DroppableDay)
