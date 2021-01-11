import React, {useState} from 'react'
import { connect } from 'react-redux'
import {bulkWriteCurrentExerciseSets} from '../../../1_Actions/exerciseSetActions'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {BiTargetLock} from 'react-icons/bi'
import EditSetModal from '../../modals/edit_set_modal/EditSetModal'

export const BankCard = ({
  exerciseSet,
  index,
  currentExerciseSets, 
  bulkWriteCurrentExerciseSets
}) => {

  const [modalShow, setModalShow] = useState(false)

  const {exercise} = exerciseSet

  const handleRemoveOne = () => {
    const copy = [...currentExerciseSets]
    copy.splice(index, 1)
    bulkWriteCurrentExerciseSets(copy)
  }

  const handleCopy = () => {
    const copy = [...currentExerciseSets]
    copy.splice(index, 0, exerciseSet)
    bulkWriteCurrentExerciseSets(copy)
  }

  const handleSetTargets = () => {

  }


  return (
    <Card
    className='bank-card'>

      {modalShow && 
      <EditSetModal 
      modalShow={modalShow} 
      setModalShow={setModalShow} />}

      <Card.Body>
        
      <BsGrid3X3Gap className='grabber' />

      <OverlayTrigger overlay={<ToolTip>Copy {exercise.name}</ToolTip>}>
        <FiCopy className='copy-icon' onClick={handleCopy} />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
        <FiMinusSquare className='remove-icon' onClick={handleRemoveOne} />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Set {exercise.name} Targets</ToolTip>}>
        <BiTargetLock className='target-icon' onClick={() => setModalShow(true)} />
      </OverlayTrigger>

        <Card.Subtitle>
          <div className='name-and-index'>
            <span>{index + 1}.</span>&nbsp;
            {exercise.name.length > 15 ? exercise.name.substring(0, 15) + '...' : exercise.name}
          </div>
        </Card.Subtitle>

      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets  
})

const mapDispatchToProps = {
  bulkWriteCurrentExerciseSets
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCard)
