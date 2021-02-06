export const legends = [
  {
      anchor: 'top',
      direction: 'row',
      justify: false,
      translateX: 0,
      translateY: -30,
      itemsSpacing: 0,
      itemDirection: 'bottom-to-top',
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 10,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
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


export const axisLeft = {
  orient: 'left',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: 'Total Target Weight',
  legendOffset: -40,
  legendPosition: 'middle'
}

export const axisBottom = {
  orient: 'bottom',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: -90,
  legend: 'Date',
  legendOffset: 36,
  legendPosition: 'middle'
}