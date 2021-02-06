import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import { axisBottom, axisLeft, legends } from './axisAndLegends'

const LineChart = ({data}) => {
  const theme = {
    textColor: '#ffffff',
    backgroundColor: '#000000',
    axis: {
      textColor: '#ffffff',
      fontSize: '14px',
      tickColor: '#eee',
    },
    grid: {
      stroke: '#888',
      strokeWidth: 1
    },
  };

  return (
    <div 
      style={{height: '400px', width: '100%', color: 'black'}}
      className="line-chart-target-weight">
        <ResponsiveLine
        data={data}
        theme={theme}
        colors={{ scheme: 'paired' }}
        margin={{ top: 50, right: 0, bottom: 50, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        textColor={'#ffffff'}
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