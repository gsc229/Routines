import React from 'react'
import {RiArrowGoBackLine} from 'react-icons/ri'
import {GrExpand} from 'react-icons/gr'
import {GiCheckMark} from 'react-icons/gi'

const SaveDiscardExpandBtnGroup = ({
  discardOnClick, 
  saveOnClick, 
  expandOnclick,
  showDiscardBtn=true,
  showSaveBtn=true,
  showExpandBtn=true
}) => {
  return (
    <div>
      {showDiscardBtn && <RiArrowGoBackLine className="discard-symbol cmd-btn" onClick={discardOnClick} />}
      {showSaveBtn && <GiCheckMark className='check-symbol cmd-btn' onClick={saveOnClick} />}
      {showExpandBtn && <GrExpand className='expand-symbol cmd-btn' onClick={expandOnclick} />}
    </div>
  )
}

export default SaveDiscardExpandBtnGroup
