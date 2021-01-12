import React, {useState, useRef} from 'react'
import { connect } from 'react-redux'
import {bulkWriteCurrentExerciseSets, setCurrentExerciseSet} from '../../../1_Actions/exerciseSetActions'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {FiTarget} from 'react-icons/fi'
import {GrMultiple, GrObjectGroup} from 'react-icons/gr'
import EditSetModal from '../../modals/edit_set_modal/SetTargetsModal'
import {DistanceIcon, WeightIcon, HashIcon, TimeIcon, SwimLapsIcon, RepsIcon} from '../../icons/Icons'

export const BankCard = ({
  exerciseSet,
  index,
  currentExerciseSets, 
  bulkWriteCurrentExerciseSets,
  setCurrentExerciseSet,
  snapshot
}) => {

  const [modalShow, setModalShow] = useState(false)

  const {exercise, target_reps, target_weight, target_time, target_distance, target_laps} = exerciseSet

  const handleRemoveOne = () => {
    const copy = [...currentExerciseSets]
    copy.splice(index, 1)
    bulkWriteCurrentExerciseSets(copy)
  }

  const handleCopy = () => {
    const copy = [...currentExerciseSets]
    copy.splice(index, 0, exerciseSet)
    currentExerciseSets.splice(index, 0, exerciseSet)
    bulkWriteCurrentExerciseSets(copy)
  }

  const handleSetTargetsClick = () => {
    setCurrentExerciseSet(exerciseSet)
    setModalShow(true)
  }

  const handleCreateSubsetClick = () => {
    return
  }


  const iconsContianer = () => {
    const noTargets = !target_reps && !target_weight && !target_time && !target_distance && !target_laps
    
    return(
      <div className="target-icons-container">
        {target_weight && 

        <OverlayTrigger overlay={<ToolTip>Weight {target_weight}</ToolTip>}>
          <div className='icon-and-number'>
            <WeightIcon />
            <span>{target_weight}</span>
          </div>
        </OverlayTrigger>
        }

        {target_time && 
        <OverlayTrigger overlay={<ToolTip>Time</ToolTip>}>
          <div className='icon-and-number'>
            <TimeIcon /><span>{target_time}</span>
          </div>
        </OverlayTrigger>
        }
        {target_distance && 
        <OverlayTrigger overlay={<ToolTip>Distance</ToolTip>}>
          <div className='icon-and-number'>
            <DistanceIcon /><span>{target_distance}</span>
          </div>
        </OverlayTrigger>
        }
        {target_reps && 
        <OverlayTrigger overlay={<ToolTip>Reps</ToolTip>}>
          <div className='icon-and-number'>
            <RepsIcon /><span>{target_reps}</span>
          </div>
        </OverlayTrigger>}
        {target_laps && 
        <OverlayTrigger overlay={<ToolTip>Laps</ToolTip>}>
          <div className='icon-and-number'>
            <SwimLapsIcon /><span>{target_laps}</span>
          </div>
        </OverlayTrigger>
        }
        {noTargets && 
        <span className='no-targets-span'>
          No targets set
        </span>
        }
      </div>
    )
  }


  return (
    <Card
    className={`bank-card ${snapshot.isDragging && 'bank-card-dragging'}`}>

      {modalShow && 
      <EditSetModal
      index={index}
      modalShow={modalShow} 
      setModalShow={setModalShow} />}

      <Card.Body>
        
      <BsGrid3X3Gap className='grabber-icon icon' />

      <OverlayTrigger overlay={<ToolTip>Make a subgroup from this exercise</ToolTip>}>
        <GrObjectGroup 
        onClick={handleCreateSubsetClick} className='create-subset-icon icon' />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Copy {exercise.name}</ToolTip>}>
        <FiCopy className='copy-icon icon' onClick={handleCopy} />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
        <FiMinusSquare className='remove-icon icon' onClick={handleRemoveOne} />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Set {exercise.name} Targets</ToolTip>}>
        <FiTarget onClick={handleSetTargetsClick} id='target-icon' className='target-icon icon' />
      </OverlayTrigger>

        <Card.Subtitle>
          <div className='name-and-index'>
            <span className='set-number-span'>Set {index + 1}:</span>&nbsp;
            {exercise.name.length > 15 ? exercise.name.substring(0, 15) + '...' : exercise.name}
          </div>
        </Card.Subtitle>
        {iconsContianer()}
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets  
})

const mapDispatchToProps = {
  bulkWriteCurrentExerciseSets,
  setCurrentExerciseSet
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCard)
