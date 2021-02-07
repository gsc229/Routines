export const getLegends = ({
  anchor= 'top',
  direction= 'row',
  justify= false,
  translateX= 0,
  translateY= -30,
  itemsSpacing= 0,
  itemDirection= 'bottom-to-top',
  itemWidth= 80,
  itemHeight= 20,
  itemOpacity= 0.75,
  symbolSize= 10,
  symbolShape= 'circle',
  symbolBorderColor= 'rgba(0, 0, 0, .5)'
}) => {

  const legends = [
    {
        anchor,
        direction,
        justify,
        translateX,
        translateY,
        itemsSpacing,
        itemDirection,
        itemWidth,
        itemHeight,
        itemOpacity,
        symbolSize,
        symbolShape,
        symbolBorderColor,
        effects: [
            {
                on: 'hover',
                style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                }
            }
        ]
    }
  ]

  return legends
}

export const getAxisLeft = ({
  orient='left',
  tickSize=5,
  tickPadding=5,
  tickRotation=0,
  legend='',
  legendOffset=-40,
  legendPosition='middle'
}) => {

  const axisLeft = {
    orient,
    tickSize,
    tickPadding,
    tickRotation,
    legend,
    legendOffset,
    legendPosition
  }

  return axisLeft

}


export const getAxisBottom = ({

  orient='bottom',
  tickSize=10,
  tickPadding=5,
  tickRotation=30,
  legend,
  legendOffset=50,
  legendPosition='middle'

}) => {

  const axisBottom = {
    orient,
    tickSize,
    tickPadding,
    tickRotation,
    legend,
    legendOffset,
    legendPosition
  }
  return axisBottom
}
