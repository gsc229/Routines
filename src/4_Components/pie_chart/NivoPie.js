import React from 'react'
import {ResponsivePie} from '@nivo/pie'
import randomColor from 'randomcolor'
import {defs} from './defs'
import {fill} from './fill'
import { muscleGroupList } from '../dashboard/helpers/muscleGroupNameAndColorList'
import clampBuilder from '../../utils/clampBuilder' 

const NivoPie = ({exSetStratumData={}, useColor}) => {

  const exerciseData = Object.keys(exSetStratumData).map(name => (
    useColor
    ?
    {
      id: name,
      label: name, 
      value: exSetStratumData[name], 
      color: muscleGroupList.find(nameColor => nameColor.name === name).color
    }
    :
    {
      id: name,
      label: name, 
      value: exSetStratumData[name], 
      color: randomColor({luminosity: 'light', format: 'rgba', alpha: 1})
    }
  ))

  return (
    <div 
    style={{height: clampBuilder(400, 1000, 15, 20)}}
    className="novi-pie-chart-container">
      <ResponsivePie
        data={exerciseData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={useColor ? d => d.data.color : d => d.data.color}
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
        defs={defs}
        fill={fill}
        //legends={legends}
        />
    </div>
  )
}

export default NivoPie
