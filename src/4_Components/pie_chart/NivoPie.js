import React from 'react'
import {ResponsivePieCanvas} from '@nivo/pie'
import randomColor from 'randomcolor'
import {defs} from './defs'
import {fill} from './fill'
import { muscleGroupList } from '../shared_helpers_and_variables/muscleGroupNameAndColorList'

const NivoPie = ({exSetStratumData={}, exerciseNameMuscleGroupColor}) => {

  const exerciseData = Object.keys(exSetStratumData).map(name => (
    exerciseNameMuscleGroupColor
    ?
    {
      id: name,
      label: name, 
      value: exSetStratumData[name], 
      color: exerciseNameMuscleGroupColor[name] || randomColor({luminosity: 'light', format: 'rgba', alpha: 1})
    }
    :
    {
      id: name,
      label: name, 
      value: exSetStratumData[name], 
      color: muscleGroupList.find(nameColor => nameColor.name === name).color
    }
    
  ))

  return (
    <div 
    className="novi-pie-chart-container">
      <ResponsivePieCanvas
        data={exerciseData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={.5}
        padAngle={0.7}
        cornerRadius={0}
        colors={d => d.data.color}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabel={'label'}
        radialLabelsSkipAngle={10}
        radialLabelsLinkOffset={-2}
        radialLabelsLinkDiagonalLength={8}
        radialLabelsLinkHorizontalLength={8}
        radialLabelsTextColor={{ from: 'color', modifiers: []}}
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#fff"
        />
    </div>
  )
}

export default NivoPie
