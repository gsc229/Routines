import React from 'react'
import { connect } from 'react-redux'
import {bulkWriteChosenExercises} from '../../../1_Actions/setGroupActions'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'
import {FiMinusSquare, FiCopy} from 'react-icons/fi'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {BiTargetLock} from 'react-icons/bi'

export const BankCard = ({
  exercise,
  index,
  chosenExercises, 
  bulkWriteChosenExercises
}) => {


  const handleRemoveOne = () => {
    const copy = [...chosenExercises]
    copy.splice(index, 1)
    bulkWriteChosenExercises(copy)
  }

  const handleCopy = () => {
    const copy = [...chosenExercises]
    copy.splice(index, 0, exercise)
    bulkWriteChosenExercises(copy)
  }

  const handleSetTargets = () => {

  }


  return (
    <Card
    className='bank-card'>
      <Card.Body>
        
      <BsGrid3X3Gap className='grabber' />

      <OverlayTrigger overlay={<ToolTip>Copy {exercise.name}</ToolTip>}>
        <FiCopy className='copy-icon' onClick={handleCopy} />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Remove {exercise.name}</ToolTip>}>
        <FiMinusSquare className='remove-icon' onClick={handleRemoveOne} />
      </OverlayTrigger>

      <OverlayTrigger overlay={<ToolTip>Set {exercise.name} Targets</ToolTip>}>
        <BiTargetLock className='target-icon' onClick={handleSetTargets} />
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
  chosenExercises: state.setGroupReducer.chosenExercises  
})

const mapDispatchToProps = {
  bulkWriteChosenExercises
}

export default connect(mapStateToProps, mapDispatchToProps)(BankCard)
