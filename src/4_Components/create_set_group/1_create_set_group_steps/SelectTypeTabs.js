import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { localWritingSetGroup, saveSetGroupChanges } from '../../../1_Actions/setGroupActions'
import Nav from 'react-bootstrap/Nav'

export const SetGroupForm = ({
  currentSetGroup,
  setGroupTypes,
  localWritingSetGroup,
  saveSetGroupChanges,
  currentStep,
  currentRoutine
}) => {

  const [show, setShow] = useState(true)
  const {set_group_type} = currentSetGroup

  useEffect(() => {
    if(currentStep === 'choose-type'){
      setShow(true)
    }
  }, [currentStep])

  const handleTypeChoice = (type) => {

   
      localWritingSetGroup('set_group_type', type)
    
  }

  return (
    <div className='set-group-type-tab-btns-container'>
     
      {currentStep !== 'choose-type' && 
      <span 
      onClick={() => setShow(!show)}
      className={`show-types-span ${!show && 'show-types-span-hide'}`}>
        {show ? 'hide' : 'show types'}
      </span>}


      {show && <h6 className='types-tabs-title'>Quick Build: </h6>}
      {show && 
      <Nav
      className='set-group-type-tab-btns'
      variant="pills">
        {setGroupTypes.map(type=>
          <Nav.Item
          key={type}
          >
            <Nav.Link
            style={{color: currentRoutine.color || 'var(--routine-red)'}}
            className={set_group_type === type && currentStep !== 'choose-type' && 'selected-disabled'}  
            eventKey={type}
            active={set_group_type === type}
            onClick={() => handleTypeChoice(type)}
            >
              {type}
            </Nav.Link>
          </Nav.Item>
          )}
        
      </Nav> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  setGroupTypes: state.setGroupReducer.set_group_types,
  currentStep: state.setGroupReducer.createSetGroupData.currentStep,
  currentRoutine: state.routineReducer.currentRoutine
})

const mapDispatchToProps = {
  localWritingSetGroup,
  saveSetGroupChanges
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupForm)
   
      {/* <Tabs
      className='set-group-type-tab-btns'
      variant= 'pills'
      
      onSelect={(type) => localWritingSetGroup('set_group_type',type)}
      activeKey={set_group_type}>
        {setGroupTypes.map(type=>
        <Tab
        disabled={currentStep !== 'choose-type'}
        key={type}
        title={type}
        eventKey={type}>
        <CreateSetGroupSteps />
        </Tab>
        )}
      </Tabs> */}