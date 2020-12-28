import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import ExerciseSet from '../exercise_set/ExerciseSet'

// styles
const draggableExerciseStyles = (snapshot, providedDraggablePropsStyle) => {

  const common = {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    cursor: 'grab',
    padding: 5,
    margin: '0 0 8px 0',
    minHeight: '50px',
    backgroundColor: snapshot.isDragging ? 'lightsalmon' : 'whitesmoke',
    color: snapshot.isDragging ? 'beige' : 'slategray',
    borderRadius: '4px',
    ...providedDraggablePropsStyle
  }

  return {...common}
}

const DraggableExSet = ({item, index, width}) => {
  return (
    <Draggable
      key={item._id}
      draggableId={item._id}
      index={index}
    >
      {(provided, snapshot) => {
        return(
          <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={draggableExerciseStyles(snapshot, provided.draggableProps.style)}
          > 
            <ExerciseSet routine_exercise={item} width={width} />
          </div>
        )
      }}
    </Draggable>
  )
}

export default DraggableExSet
