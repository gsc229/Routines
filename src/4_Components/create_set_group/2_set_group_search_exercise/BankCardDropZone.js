import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {canMoveToForm, minAndMaxAllowedExercises, getSetComboType} from '../createSetGroupHelpers'
import {removeChosenExercise, bulkWriteChosenExercises, writingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import {Droppable} from 'react-beautiful-dnd'
import BankCardDraggable from './BankCardDraggable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {FaRegHandPointRight} from 'react-icons/fa'
import { BiMask } from 'react-icons/bi'


const BankCardDropZone = ({
  chosenExercises,
  currentSetGroup,
  removeChosenExercise,
  bulkWriteChosenExercises,
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
            {canMoveToForm(set_group_type, createSetGroupData, chosenExercises) && 
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
            {!chosenExercises.length && 
              minMaxMessage()
            }
            {chosenExercises.map((exercise, index) => {
              return (<BankCardDraggable  exercise={exercise} index={index}  />)
            })}
          {provided.placeholder}
          </Row>

      </Container>
      
    )}}
      
    </Droppable>
  )
}

const mapStateToProps = (state) => ({
  chosenExercises: state.setGroupReducer.chosenExercises,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  createSetGroupData: state.setGroupReducer.createSetGroupData
})

const mapDispatchToProps = {
  removeChosenExercise,
  writingCreateSetGroupData,
  bulkWriteChosenExercises
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCardDropZone)


