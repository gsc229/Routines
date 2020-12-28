import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import SetGroup   from './SetGroupScheduleCard'

// styles
const draggableSetGroupStyles = (snapshot, providedDraggablePropsStyle) => {

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

const DraggableSetGroup = ({set_group, index, width}) => {
  console.log("DraggaleSetGroup: ", {set_group})
  return (
    <Draggable
      key={set_group._id}
      draggableId={set_group._id}
      index={index}
    >
      {(provided, snapshot) => {
        return(
          <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={draggableSetGroupStyles(snapshot, provided.draggableProps.style)}
          > 
            <SetGroup set_group={set_group} width={width} />
          </div>
        )
      }}
    </Draggable>
  )
}

export default DraggableSetGroup