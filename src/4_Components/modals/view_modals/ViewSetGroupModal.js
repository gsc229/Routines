import React from 'react'
import { connect } from 'react-redux'
import {localWritingCreateSetGroupData} from '../../../1_Actions/setGroupActions'
import Modal from 'react-bootstrap/Modal'
import {Link} from 'react-router-dom'

export const ViewSetGroupModal = ({
  currentSetGroup,
  modalShow,
  setModalShow,
  currentExerciseSets,
  redirectLink,
  localWritingCreateSetGroupData,
  showEditLink=true
}) => {

  const getTargetsAndActual = (exSet) => {
    
    const keyValueSets = []

    Object.keys(exSet).map(key => {
      if(key.includes('target') && exSet[key]){
        const target = key.split("_").join(" ")
        const actual = target.replace('target', 'actual')
        const actual_unit = actual.split(" ").join("_")
        keyValueSets.push(
          {
          target: { key: target, value: exSet[key] },
          actual: {key: actual, value: exSet[actual_unit]}
         }
        )
      }
    })

    return keyValueSets
  }


  const handleEditClick = () => {
    localWritingCreateSetGroupData('mode', 'editing')
  }


  return (
    <Modal
    className='view-set-group-modal modal'
    show={modalShow}
    onHide={() => setModalShow(false)}
    size='lg'
    aria-labelledby={`set-group-${currentSetGroup._id}`}
    centered>
      <Modal.Header 
      className='view-set-group-modal-header' 
      closeButton>
        <div className='heading-and-edit-link'>
          <h5>Set Name: {currentSetGroup.name}</h5>
          {showEditLink && 
          <Link
          onClick={handleEditClick}
          className='edit-link' 
          to={redirectLink}>
            Edit Set
          </Link>}
        </div>
      </Modal.Header>
      <Modal.Body className='modal-body view-set-group-modal-body'>
        <h6>Sets:</h6>
       {/*  {JSON.stringify(currentExerciseSets, '', 2)} */}
       <div className='set-group-modal-sets-container'>
          {currentExerciseSets.map((set, index) => 
            <div key={`${set._id}${index}`} className='set-container'>
              <p>Exercise {index + 1}: <i>{set.exercise.name}</i></p>
              <ul className='targets-and-actual-list'>
                {getTargetsAndActual(set).map((kVs, index2 )=> {
                  return(
                    <li key={`${set._id}-${index}-${index2}`}>
                      {kVs.target.key}: {kVs.target.value} <br/>
                      {kVs.actual.key}: {kVs.actual.value ? kVs.actual.value : <i>not recorded</i>}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
       </div>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  currentRoutine: state.routineReducer.currentRoutine,
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  localWritingCreateSetGroupData
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSetGroupModal)
