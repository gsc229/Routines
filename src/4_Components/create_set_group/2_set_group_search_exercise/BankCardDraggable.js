import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import BankCard from './BankCard'

const BankCardDraggable = ({
  exerciseSet, 
  index
}) => {
  return (
    <Draggable
    key={`${exerciseSet._id}-${index}-draggable`}
    draggableId={`${exerciseSet._id}-${index}-draggable`}
    index={index}>
    {(provided, snapshot) => {
      return(
        <div
        className={`bank-card-draggable ${snapshot.isDragging && 'bank-card-draggable-dragging'}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
         <BankCard 
         snapshot={snapshot}
         exerciseSet={exerciseSet} 
         index={index} />
         {provided.placeholder}
        </div>
      )
    }}
    </Draggable>
  )
}

export default BankCardDraggable
