import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { connect } from 'react-redux'
import { writingSetGroup } from '../../../1_Actions/setGroupActions'
import CreateSetGroupSteps from '../create_set_group_steps/CreateSetGroupSteps'

export const SetGroupForm = ({
  currentSetGroup,
  setGroupTypes,
  writingSetGroup
}) => {

  const {set_group_type} = currentSetGroup

  return (    
      <Tabs
      className='this-is-a-nav'
      variant= 'pills'
      onSelect={(type) => writingSetGroup('set_group_type',type)}
      activeKey={set_group_type}>
        {setGroupTypes.map(type=>
        <Tab
        key={type}
        title={type}
        eventKey={type}>
          <CreateSetGroupSteps />
        </Tab>
        )}
      </Tabs>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  setGroupTypes: state.setGroupReducer.set_group_types
})

const mapDispatchToProps = {
  writingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(SetGroupForm)
