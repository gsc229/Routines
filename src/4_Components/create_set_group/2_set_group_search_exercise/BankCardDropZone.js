import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {canMoveToForm, minAndMaxAllowedExercises, getSetComboType} from '../createSetGroupHelpers'
import {writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {removeFromCurrentExerciseSetsByExerciseID, bulkWriteCurrentExerciseSets} from '../../../1_Actions/exerciseSetActions'
import {Droppable} from 'react-beautiful-dnd'
import BankCardDraggable from './BankCardDraggable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {FaRegHandPointRight} from 'react-icons/fa'
import { BiMask } from 'react-icons/bi'


const BankCardDropZone = ({
  currentExerciseSets,
  currentSetGroup,
  removeFromCurrentExerciseSetsByExerciseID,
  bulkWriteCurrentExerciseSets,
  writingCreateSetGroupData,
  createSetGroupData
}) => {


  const {set_group_type} = currentSetGroup
  const {min, max} = minAndMaxAllowedExercises(set_group_type)
  const minMaxMessage = () => {

    const common = <>Exercises you choose for your <strong><i>{set_group_type} Set</i></strong> will be displayed here...</>

    if(min && !max){
      return <p className='no-exercises-message'>{common}<br/>{set_group_type} sets need a miniumum of {min} exercises</p>
    }
    if(min === max){
      return <p className='no-exercises-message'>{common}<br/>{set_group_type} sets need exactly {min} {min > 1 ? 'exercises' : 'exercise'}.</p>
    }

  }

  return (
    <Droppable
    direction='horizontal'
    key={'bank-card-drop-zone'}
    droppableId={'bank-card-drop-zone'}>
    {(provided, snapshopt) => {
      return(
        <Container
        className={`chosen-exercises-bank ${snapshopt.isDraggingOver && 'exercise-bank-dragover'}`}>
          <div className='chosen-exerciese-bank-header'>
            <h4>Chosen Exercises:</h4>
            {canMoveToForm(set_group_type, createSetGroupData, currentExerciseSets) && 
            <p 
            onClick={() => writingCreateSetGroupData('currentStep', 'enter-info')}>
              Enter {set_group_type} Set Info <FaRegHandPointRight />
            </p>}
          </div>
          
          <Row 
          {...provided.droppableProps}
          ref={provided.innerRef}
          id='bank-body'
          className='bank-body'>
            {!currentExerciseSets.length && 
              minMaxMessage()
            }
            {currentExerciseSets.map((exerciseSet, index) => {
              return (<BankCardDraggable key={`${exerciseSet._id}-${index}`} exerciseSet={exerciseSet} index={index}  />)
            })}
          {provided.placeholder}
          </Row>

      </Container>
      
      )}}
      
    </Droppable>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
  removeFromCurrentExerciseSetsByExerciseID,
  writingCreateSetGroupData,
  bulkWriteCurrentExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCardDropZone)


