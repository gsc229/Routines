import React, {useState} from 'react'
import { connect } from 'react-redux'
import {destroyExerciseSet, localBulkWriteExerciseSets, setCurrentExerciseSet, createSingleExerciseSet} from '../../../1_Actions/exerciseSetActions'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {FiTarget} from 'react-icons/fi'
import {GrObjectGroup} from 'react-icons/gr'
import TargetIcons from './TargetIcons'
import EditSetModal from '../3_targets_and_subgroups/SetTargetsModal'
import SubGroupModal from '../3_targets_and_subgroups/SubGroupModal'
import ColorPickerModal from '../../modals/color_picker_modal/ColorPickerModal'
import {BiPalette} from 'react-icons/bi'

export const BankCard = ({
  exerciseSet,
  index,
  currentExerciseSets, 
  localBulkWriteExerciseSets,
  setCurrentExerciseSet,
  destroyExerciseSet,
  snapshot,
  createSetGroupData,
  createSingleExerciseSet
}) => {

  const [modalShow, setModalShow] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const {exercise, color} = exerciseSet

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
    // prevents deleting more than one while on touch screen
    setTimeout(() => {
      localBulkWriteExerciseSets(copy)
    }, 200)

    if(exerciseSet._id){
      await destroyExerciseSet(exerciseSet._id)
    }
  }

  const handleCopy = async () => {
    const copySet = {...exerciseSet}
    delete copySet._id
    delete copySet.id
    const copySets = [...currentExerciseSets]
    copySets.splice(index, 0, exerciseSet)

    if(createSetGroupData.mode === 'editing'){
      const createResponse = await createSingleExerciseSet(copySet)
    } else{
      
      setTimeout(() => {
        localBulkWriteExerciseSets(copySets)
      }, 500);
    }


  }

  const handleOpenTargetsModal = () => {
    setCurrentExerciseSet(exerciseSet)
    // slow down for touch screen to prevent outside modal close click
    setTimeout(() => {
      setModalShow("set-targets")
    }, 100)
  }

  const handleOpenSubGroupModal = () => {
    setCurrentExerciseSet(exerciseSet)
    // slow down for touch screen to prevent outside modal close click
    setTimeout(() => {
      setModalShow("sub-group")
    }, 100)
  }


  return (
    <Card
    style={{border: `2px solid ${color ? color  : '--gold-fusion'}`}}
    className={`bank-card ${snapshot.isDragging && 'bank-card-dragging'}`}>
      
      

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

      <BiPalette 
      className='color-picker-icon icon'  
      onClick={() => setShowPicker(true)}/>

      <OverlayTrigger overlay={<ToolTip>Make a subgroup from this exercise</ToolTip>}>
        <GrObjectGroup
        onTouchEndCapture={handleOpenSubGroupModal}  
        onClick={handleOpenSubGroupModal} className='create-subset-icon icon' />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Copy {exercise.name}</ToolTip>}>
        <FiCopy 
        onTouchEnd={handleCopy} 
        onClick={handleCopy} className='copy-icon icon' />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
        <FiMinusSquare 
        onTouchEndCapture={handleRemoveOne}
        onClick={handleRemoveOne} className='remove-icon icon'  />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Set {exercise.name} Targets</ToolTip>}>
        <FiTarget 
        onTouchEndCapture={handleOpenTargetsModal}
        onClick={handleOpenTargetsModal} id='target-icon' className='target-icon icon' />
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
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets,
  createSetGroupData: state.setGroupReducer.createSetGroupData 
})

const mapDispatchToProps = {
  localBulkWriteExerciseSets,
  setCurrentExerciseSet,
  destroyExerciseSet,
  createSingleExerciseSet
  
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCard)
