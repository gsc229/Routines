import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {localWritingSetGroup} from '../../../1_Actions/setGroupActions'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export const SgNameInputForm = ({
  currentSetGroup,
  localWritingSetGroup,
  currentExerciseSets
}) => {

  const [useAutoGenName, setUseAutoGen] = useState(false)

  const setGroupType = currentSetGroup.set_group_type
  const firstThreeNames = []

  currentExerciseSets.forEach(set => firstThreeNames.length < 3 && firstThreeNames.indexOf(set.exercise.name) === -1 && firstThreeNames.push(set.exercise.name))
  console.log({firstThreeNames})
  const firstSet = firstThreeNames[0] 
  const secondSet = firstThreeNames[1] 
  const thirdSet = firstThreeNames[2] 

  const autoNameString = `${setGroupType ? setGroupType + ' Set' : ''} ${firstSet ? ' - ' + firstSet : ''}${secondSet ? ', ' +  secondSet : ''}${thirdSet ? ', ' + thirdSet+ '...' : ''}`

  const autoName = firstSet && useAutoGenName ?  autoNameString : useAutoGenName ? 'Waiting for first exercise selection...' : ''

  useEffect(() => {

    if(!currentSetGroup.name || currentSetGroup.name === autoNameString) setUseAutoGen(true)

    if(useAutoGenName){
      localWritingSetGroup('name', autoNameString)
    }
    if(!currentSetGroup.name && currentExerciseSets.length){
      localWritingSetGroup('name', autoNameString)
    }
  }, [currentExerciseSets, setGroupType])



  const handlChooseAutoGen = () => {
    setUseAutoGen(!useAutoGenName)
    localWritingSetGroup('name', autoNameString)
  }

  return (
    <Form className='create-set-group-name-input-form'>
      <Form.Group>
        <Form.Label>
          Add Set Group
        </Form.Label>
          <InputGroup>
          <Form.Control
          disabled={useAutoGenName}
          name='name'
          value={currentSetGroup.name ? currentSetGroup.name : autoName }
          onChange={(e)=> localWritingSetGroup(e.target.name, e.target.value)}
          type='text' 
          placeholder='Name your set group...' />
          <InputGroup.Append>
            <OverlayTrigger overlay={<Tooltip>Name will be the set group type and first three exercises</Tooltip>}>
            <InputGroup.Checkbox 
            checked={useAutoGenName}
            onChange={handlChooseAutoGen} />
            </OverlayTrigger>
            <InputGroup.Text >Auto Getnerate Name</InputGroup.Text>
          </InputGroup.Append>
          </InputGroup>
      </Form.Group>
      </Form>
  )
}

const mapStateToProps = (state) => ({
  currentSetGroup: state.setGroupReducer.currentSetGroup,
  currentExerciseSets: state.exerciseSetReducer.currentExerciseSets
})

const mapDispatchToProps = {
  localWritingSetGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(SgNameInputForm)
