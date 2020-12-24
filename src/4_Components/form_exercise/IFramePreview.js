import React from 'react'
import IFrame from '../iframe/IFrame'

const IFramePreview = ({iframeString, height, width, style}) => {
  return (
  <div style={{height, width, ...style}} className="iframe-preview">
    <p>Preview: </p>
    <IFrame 
    forFormValidation={true}
    iframeString={iframeString}
    validatoin_error_message=""
    />
  </div>
  )
}

export default IFramePreview
