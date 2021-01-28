import React from 'react'

const DevComponent = ({
  dndDimensions,
  maxColumns,
  windowHeight,
  windowWidth,
  currentExerciseSets,
  dropZoneSets
}) => {

  const numColumns = Math.floor(dndDimensions.dropZonesContainer.width / dndDimensions.bankCard.width)
  const numRows = Math.ceil(currentExerciseSets.length / numColumns)


  return (
    <div>
          {/* <h6>
            WINDOW:&nbsp; 
            {`Height: ${windowHeight}`} {`Width: ${windowWidth}`}
          </h6>
          <h6>
            DROP ZONES CONTAINER:&nbsp;
            {JSON.stringify(dndDimensions.dropZonesContainer, '', 2)}
          </h6>
          <h6>
            BANK CARD:&nbsp; 
            {JSON.stringify(dndDimensions.bankCard, '', 2)}
          </h6>
          <h6>
            NO. COLUMNS: {numColumns}
          </h6>
          <h6>
            NO. ROWS : {numRows}
          </h6> */}
    {JSON.stringify({...dndDimensions, maxColumns, dropZones: dropZoneSets.length},null, 4)}
</div>
  )
}

export default DevComponent
