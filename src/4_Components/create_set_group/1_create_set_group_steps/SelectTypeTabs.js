import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { writingSetGroup } from '../../../1_Actions/setGroupActions'
import Nav from 'react-bootstrap/Nav'

export const SetGroupForm = ({
  currentSetGroup,
  setGroupTypes,
  writingSetGroup,
  currentStep
}) => {

  const [show, setShow] = useState(true)
  const {set_group_type} = currentSetGroup

  useEffect(() => {
    if(currentStep === 'choose-type'){
      setShow(true)
    }
  }, [currentStep])

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
            className={set_group_type === type && currentStep !== 'choose-type' && 'selected-disabled'}  
            eventKey={type}
            disabled={currentStep !== 'choose-type'}
            active={set_group_type === type}
            onClick={() => writingSetGroup('set_group_type', type)}
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
  currentStep: state.setGroupReducer.createSetGroupData.currentStep
})

const mapDispatchToProps = {
  writingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupForm)
   
      {/* <Tabs
      className='set-group-type-tab-btns'
      variant= 'pills'
      
      onSelect={(type) => writingSetGroup('set_group_type',type)}
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