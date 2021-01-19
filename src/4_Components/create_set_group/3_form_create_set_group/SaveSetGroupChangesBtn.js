import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {saveSetGroupChanges} from '../../../1_Actions/setGroupActions'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {GiBiceps} from 'react-icons/gi'

export const SaveSetGroupChangesBtn = ({
  currentSetGroup,
  saveSetGroupChanges,
  crudingSetGroup,
  changesSaved,
  setChangesSaved
}) => {


 
  const handleSaveChanges = async () => {

    const saveChagnesResponse = await saveSetGroupChanges(currentSetGroup._id, currentSetGroup)
    setChangesSaved(true)
  }

  const getButtonMessage = () => {

    if(!crudingSetGroup && !changesSaved){
      return (
        <div className='btn-message'>
          Save Changes &nbsp;
          <GiBiceps/>
        </div>
      )
    }

    if(crudingSetGroup === 'updating-set-group'){
      return (
        <div className='btn-message'>
          Saving Changes &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </div>
      )
    }

    if(!crudingSetGroup && changesSaved){
      return (
        <div className='btn-message'>
          Changes Saved!
        </div>
      )
    }

  }

  return (
    <Button
    disabled={crudingSetGroup || changesSaved}
    variant='success'
    onClick={handleSaveChanges}>
      {getButtonMessage()}
    </Button>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  crudingSetGroup: state.setGroupReducer.crudingSetGroup
})

const mapDispatchToProps = {
  saveSetGroupChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveSetGroupChangesBtn)