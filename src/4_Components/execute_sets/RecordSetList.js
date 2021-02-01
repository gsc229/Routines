import React from 'react'
import RecordSetInput from './RecordSetInput'
import NavLink from 'react-bootstrap/NavLink'
import {Link} from 'react-router-dom'
import {PointRightIcon} from '../icons/Icons'

const RecordSetList = ({
  targets,
  targetsToActuals,
  currentExerciseSet,
  userRoutines,
  setEditingActual,
  editingActual,
  routineColor
}) => {

  const routine = userRoutines.find(rt => rt._id === currentExerciseSet.routine)
  const weekNumber = routine.weeks.find(wk => wk._id === currentExerciseSet.week).week_number
  const dayNumber = routine.set_groups.find(sg => sg._id === currentExerciseSet.set_group).day_number || 0
  const handleSetTargets = () => {

  }
  const redirectLink = `/create-set-group/`
  .concat(`${routine.slug ? routine.slug : routine.name.replace(/[\s]/g, '')}`)
  .concat(`/week-${weekNumber}/day-${dayNumber}}`)

  const noTargetsMessage = () => {
    return(
      <div 
      className='no-targets-messge-container'>
        <p className="no-targets-message">
          This set has no targts set.
        </p>
        <Link 
        to={redirectLink}>
          Set Targets &nbsp;
          <PointRightIcon />
        </Link>
      </div>
    )
  }


  return (
    <ul 
    className='list inputs-list'>

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
                    Edit
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

export default RecordSetList
