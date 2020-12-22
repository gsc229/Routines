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
      {showDiscardBtn && <RiArrowGoBackLine className="discard-btn cmd-btn" onClick={discardOnClick} />}
      {showSaveBtn && <GiCheckMark className='complete-btn cmd-btn' onClick={saveOnClick} />}
      {showExpandBtn && <GrExpand className='expand-btn cmd-btn' onClick={expandOnclick} />}
    </div>
  )
}

export default SaveDiscardExpandBtnGroup
