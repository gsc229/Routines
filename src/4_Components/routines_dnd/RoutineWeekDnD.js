import React, {useState, useEffect} from 'react'
import {DragDropContext,  Droppable} from 'react-beautiful-dnd'
import {weekConstructor} from './helpers/weekConstructor'
import {onDragEnd} from './helpers/routineWeekHelpers'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import DraggableExercise from './DraggableExercise'

const RoutinesWeekDnD = ({weekData}) => {
  
  const {height, width} = useWindowSize()

  const [columns, setColumns] = useState(weekConstructor(weekData))

  
  useEffect(() => {  
    setColumns(weekConstructor(weekData))
  }, [weekData])


  // styles 
  const getWeekDroppableRowStyles = () => {

    const commom = {
      border: '1px solid greenyellow',
      display: 'flex',
      minHeight: '300px',
      width: 'fit-content',
      margin: 'auto',
      padding:'0px'
    }

    if(width < 850){
      return {...commom, flexWrap: 'wrap', margin: '20px', justifyContent: 'center'}
    }

    return {...commom, justifyContent: 'space-between', flexWrap: 'wrap'}
  }


  const getDayDroppableContainerStyles = (saturday=false) => {
    const commom = {
      //backgroundColor: 'orangered',
      minHeight: '100%',
      marginBottom: '20px',
      maxWidth: '60%',
      margin: 'auto'
    }

    if(width < 500){
      return {...commom,  maxWidth: '100%'}
    }

    if(width < 700){
      return {...commom,  maxWidth: '90%'}
    }

    return {...commom}

  }

  const getDayDroppableStyles = (snapshot, id) => {
    const commom = {
      backgroundColor: 'lightgray',
      border: snapshot.isDraggingOver ? `lightsalmon 5px solid` : '',
      borderRadius: '4px',
      padding: '8px',
      height: '100%',
      minHeight: '100px',
      minWidth: '200px',
      margin: '20px auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginRight: '20px'
    
    }

    if(width < 500){
      return {...commom,  maxWidth: '100%'}
    }


    if(width < 850){
      return {...commom,}
    }

    return {...commom}
  }

  

  return (
    <LayoutOne>
      <div className='container-fluid'>
        <p>height: {height} width: {width}</p>
        <div className='row week-droppable-row' style={getWeekDroppableRowStyles()}>
          <DragDropContext
            onDragEnd={ result=> onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([id, column]) => {
              
              return(
                <div key={id} className='day-droppable-container' style={getDayDroppableContainerStyles()}>                
                    <h4 style={{fontSize:"18px"}}>{column.name}</h4>
                    
                      <Droppable
                        key={id}
                        droppableId={id}
                      >
                        {(provided, snapshot) => {
                          return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getDayDroppableStyles(snapshot, id)}
                          >
                            {column.items.map((item, index) => {
                              return(
                                <DraggableExercise key={index} item={item} index={index} width={width} />
                              )
                            })}
          
                          {provided.placeholder}
                          </div>)
                        }}
                      </Droppable>
                </div>
              )
            })}
          </DragDropContext>
        </div>
      </div>
    </LayoutOne>
  )
}

export default RoutinesWeekDnD
