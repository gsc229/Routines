import React, {useState} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

export const ViewSetGroupModal = ({
  currentSetGroup,
  modalShow,
  setModalShow,
  currentSetGroupSets
}) => {

  const getTargetsAndActual = (exSet) => {
    
    const keyValueSets = []

    Object.keys(exSet).map(key => {
      if(key.includes('target') && exSet[key]){
        const target = key.split("_").join(" ")
        const actual = target.replace('target', 'actual')
        const actual_unit = actual.split(" ").join("_")
        console.log({target, actual, actual_unit})
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


  return (
    <Modal
    className='view-set-group-modal'
    show={modalShow}
    onHide={() => setModalShow(false)}
    size='lg'
    aria-labelledby={`set-group-${currentSetGroup._id}`}
    centered>
      <Modal.Header className='modal-header view-set-group-modal-header' closeButton>
        <h5><span>Set Name: </span> {currentSetGroup.name}</h5>

      </Modal.Header>
      <Modal.Body className='modal-body view-set-group-modal-body'>
        <h6>Sets:</h6>
       {/*  {JSON.stringify(currentSetGroupSets, '', 2)} */}
       <div className='set-group-modal-sets-container'>
          {currentSetGroupSets.map((set, index) => 
            <div className='set-container'>
              <p>Exercise {index + 1}: <i>{set.exercise.name}</i></p>
              <ul className='targets-and-actual-list'>
                {getTargetsAndActual(set).map(kVs => {
                  return(
                    <li>
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
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentSetGroupSets: state.exerciseSetReducer.currentSetGroupSets

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSetGroupModal)
