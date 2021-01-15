import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroyExerciseSet, localBulkWriteExerciseSets, setCurrentExerciseSet} from '../../../1_Actions/exerciseSetActions'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {FiTarget} from 'react-icons/fi'
import {GrObjectGroup} from 'react-icons/gr'
import TargetIcons from './TargetIcons'
import EditSetModal from '../../modals/edit_set_modal/SetTargetsModal'
import SubGroupModal from '../../modals/edit_set_modal/SubGroupModal'
import ColorPickerModal from '../../modals/color_picker_modal/ColorPickerModal'
import {BiPalette} from 'react-icons/bi'

export const BankCard = ({
  exerciseSet,
  index,
  currentExerciseSets, 
  localBulkWriteExerciseSets,
  setCurrentExerciseSet,
  destroyExerciseSet,
  snapshot
}) => {

  const [modalShow, setModalShow] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const {exercise, color, order, _id} = exerciseSet
 


  const handleColorPick = (color) => {
    const currentExerciseSetsCopy = [...currentExerciseSets]
    currentExerciseSetsCopy.forEach(set => {
      if(set.exercise._id === exercise._id){
        set.color = color.hex
      }
    })
    localBulkWriteExerciseSets(currentExerciseSetsCopy)
    setShowPicker(false)
  }

  const handleRemoveOne = async () => {
    // new sets don't have _ids so splice index and recreate the array.
    const copy = [...currentExerciseSets]
    copy.splice(index, 1)
    localBulkWriteExerciseSets(copy)

    if(exerciseSet._id){
      await destroyExerciseSet(exerciseSet._id)
    }
  }

  const handleCopy = () => {
    const copy = [...currentExerciseSets]
    copy.splice(index, 0, exerciseSet)
    currentExerciseSets.splice(index, 0, exerciseSet)
    localBulkWriteExerciseSets(copy)
  }

  const handleSetTargetsClick = () => {
    setCurrentExerciseSet(exerciseSet)
    setModalShow("set-targets")
  }

  const handleCreateSubGroupClick = () => {
    setCurrentExerciseSet(exerciseSet)
    setModalShow("sub-group")
  }


  return (
    <Card
    style={{border: `2px solid ${color ? color  : '--gold-fusion'}`}}
    className={`bank-card ${snapshot.isDragging && 'bank-card-dragging'}`}>
      
      <BiPalette 
      className='color-picker-icon'  
      onClick={() => setShowPicker(true)}/>

      <ColorPickerModal 
      setShowPickerModal={setShowPicker}
      handleColorPick={handleColorPick}
      showPickerModal={showPicker}/>
      
      {modalShow === "set-targets" &&
      <EditSetModal
      index={index}
      modalShow={modalShow==="set-targets"} 
      setModalShow={setModalShow} />}

      {modalShow === "sub-group" &&
      <SubGroupModal
      index={index}
      modalShow={modalShow==="sub-group"} 
      setModalShow={setModalShow} />}


      <Card.Body>
      <BsGrid3X3Gap className='grabber-icon icon' />

      <OverlayTrigger overlay={<ToolTip>Make a subgroup from this exercise</ToolTip>}>
        <GrObjectGroup 
        onClick={handleCreateSubGroupClick} className='create-subset-icon icon' />
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

        <TargetIcons exerciseSet={exerciseSet} />

      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets  
})

const mapDispatchToProps = {
  localBulkWriteExerciseSets,
  setCurrentExerciseSet,
  destroyExerciseSet
  
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCard)
