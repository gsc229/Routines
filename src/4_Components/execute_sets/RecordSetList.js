import React, {useState} from 'react'
import { connect } from 'react-redux'
import RecordSetInput from './RecordSetInput'
import NavLink from 'react-bootstrap/NavLink'
import Button from 'react-bootstrap/Button'
import {TargetIcon} from '../icons/Icons'
import SetTargetsModal from '../create_set_group/3_targets_and_subgroups/SetTargetsModal'

const RecordSetList = ({
  targets,
  targetsToActuals,
  currentExerciseSet,
  setEditingActual,
  editingActual,
  routineColor
}) => {

  const [modalShow, setModalShow] = useState(false)

  const handleSetTargets = () => {

  }


  const noTargetsMessage = () => {
    return(
      <div 
      className='no-targets-messge-container'>
        <p className="no-targets-message">
          This set has no targts set.
        </p>
        <Button
        style={{display: 'flex', alignItems: 'center'}}
        onClick={() => setModalShow(true)}>
          Set Targets &nbsp;
          <TargetIcon />
        </Button>
      </div>
    )
  }


  return (
    <ul 
    className='list inputs-list'>
          <SetTargetsModal 
          setModalShow={setModalShow}
          modalShow={modalShow}/>
          {targets.length === 0 &&
          noTargetsMessage()}

          {targets.length  > 0 && targets.map(target =>{ 

            const actualName = targetsToActuals[target.field_name].name
            const actualValue = targetsToActuals[target.field_name].value 
            const actualField = targetsToActuals[target.field_name].field_name

            return( 
            <li
            key={target.field_name}
            style={{border: `1px dotted ${routineColor ? routineColor : 'var(--routine-red)'}`}} 
            className='list-item inputs-list-list-item'>
                <div className='list-item-top'>

                  <div className='target-and-result'>
                    <div 
                    className='target-container'>
                      {target.name}: {target.value}
                    </div>  
                    <div 
                    className='result-container'>
                      {actualName}: {currentExerciseSet[actualField] !== null ? currentExerciseSet[actualField] : <span className='not-recorded-span'>not recorded</span>}
                    </div>
                  </div>
                  
                  {editingActual !== actualName && 
                  <NavLink
                  to=''
                  onClick={() => setEditingActual(actualName)}
                  className='edit-button'>
                    Record Result
                  </NavLink>}

                  {editingActual === actualName && 
                  <NavLink
                  to=''
                  onClick={() => setEditingActual(false)}
                  className='edit-button'>
                    Done
                  </NavLink>}

                </div>

                <div className={`list-item-bottom  ${editingActual === actualName ? 'show-list-item-bottom' : ''}`}>
                  <RecordSetInput
                  field={targetsToActuals[target.field_name].field_name} />
                </div>
            </li>

            )
          })}

        </ul>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RecordSetList)
