import React, {Fragment} from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import {purifyIframe} from '../../utils/sanitizeHTML'

const IFrame = ({
  iframeString, 
  forFormValidation=false,
  heading,
  validatoin_error_message=<h4>Sorry, only allows iframe elements from YouTube</h4>,
  render_error_message=<h4>"!Sorry, something went wrong when trying to display the asset"</h4>,
  show_default_error_message=true
}) => {
  

  const purifyResults = purifyIframe(iframeString)
  const purifiedIframe = purifyResults.purifiedIframe
  const removed = purifyResults.removed
  const error_message = purifyResults.error_message

  console.log({purifyResults, purifiedIframe, removed})

  const getEmbed = () => {
    return purifiedIframe && 
    <div className='responsive-embed-container'>
      {heading}
      <ResponsiveEmbed>
        <div dangerouslySetInnerHTML={{__html: purifiedIframe}} />
      </ResponsiveEmbed>
    </div> 
  }
  
  const formValidationErrorMessage = () => {
    return !purifiedIframe && forFormValidation && show_default_error_message && validatoin_error_message || error_message
  }

  const nonFormValidationMethod = () => {
    return!purifiedIframe && !forFormValidation && show_default_error_message && render_error_message
  }

  const removedItemsMessage = () => {

    return forFormValidation && removed.length > 0 && 
    <ul style={{padding: 0}}>
      The following are not allowed:
      {removed.map((obj, index) =>{
      
      const makeSure = obj.element && obj.element.tagName === "IFRAME" ? "Make sure the tag was coppied correctly: " : ""

      return <li style={{marginLeft: '30px', paddingLeft: 0}} key={index}>
        {makeSure}
        {obj.element ? obj.element.tagName : JSON.stringify(obj)}
      </li>
      
      })}
    </ul>
  }


  return (
    <Fragment>
      {getEmbed()}
      {formValidationErrorMessage()}
      {nonFormValidationMethod()}
      {removedItemsMessage()}
    </Fragment>
  )
}

export default IFrame

