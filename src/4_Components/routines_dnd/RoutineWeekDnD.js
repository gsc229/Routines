import React, {useState, useEffect} from 'react'
import {DragDropContext,  Droppable} from 'react-beautiful-dnd'
import {weekConstructor} from './helpers/weekConstructor'
import {onSetGroupDragEnd} from './helpers/routineWeekHelpers'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import LayoutOne from '../../6_Layouts/layout_one/LayoutOne'
import DraggableSetGroup from '../set_group/DraggableSetGroup'

const RoutinesWeekDnD = ({setGroups}) => {
  
  const {height, width} = useWindowSize()

  const [weekDays, setWeekDays] = useState(weekConstructor(setGroups))

  console.log({setGroups})
  useEffect(() => {  
    setWeekDays(weekConstructor(setGroups))
  }, [setGroups])


  // styles 
  const getWeekDroppableRowStyles = () => {

    const commom = {
      border: '3px solid pink',
      backgroundColor: 'blue',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '300px',
      width: '100%',
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
      backgroundColor: 'orangered',
      border: '1px solid yellow',
      width: '100%',
      minHeight: '100%',
      marginBottom: '20px',
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
      minHeight: '200px',
    
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
            onDragEnd={ result=> onSetGroupDragEnd(result, weekDays, setWeekDays)}
          >
            {Object.entries(weekDays).map(([id, day]) => {
              
              return(
                <div key={id} className='day-droppable-container' style={getDayDroppableContainerStyles()}>                
                    <h4 style={{fontSize:"18px"}}>{day.name}</h4>
                    
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
                            {day.set_groups.map((set_group, index) => {
                              return(
                                <DraggableSetGroup key={index} set_group={set_group} index={index} width={width} />
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
