import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import SetGroupScheduleCard from './SetGroupScheduleCard'

export const DraggableSetGroup = ({
  weekNumber,
  dayNumber,
  set_group, 
  index}) => {
  
  return (
    <Draggable
      key={set_group._id}
      draggableId={set_group._id}
      index={index}>
      {(provided, snapshot)=>{
        return(
          <div
          className={`set-group-draggable-container ${snapshot.isDragging && 'set-group-draggable-container-dragging'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          >
            <SetGroupScheduleCard
            weekNumber={weekNumber}
            dayNumber={dayNumber}
            set_group={set_group} 
            isDragging={snapshot.isDragging} />
            {provided.placeholder}
          </div>
        )
      }}
                  
    </Draggable>
  )
}

export default DraggableSetGroup
