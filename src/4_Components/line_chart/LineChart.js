import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import { axisBottom, axisLeft, legends } from './axisAndLegends'

const LineChart = ({data}) => {
  return (
    <div 
      style={{height: '400px', width: '100%'}}
      className="line-chart-target-weight">
        <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={legends}
    />
  </div>
  )
}

export default LineChart
