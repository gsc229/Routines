import React, {Fragment, useState} from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import {purifyIframe} from './sanitizeHTML'

const IFrame = ({
  iframeString, 
  forFormValidation=false,
  heading=false,
  validation_error_message=<h4>Sorry, only allows iframe elements from YouTube</h4>,
  default_error_message="",
  show_default_error_message=true
}) => {
  
  const purifiedResults = purifyIframe(iframeString) 
  const purifiedIframe = purifiedResults.purifiedIframe
  const removed = purifiedResults.removed
  const error_message = purifiedResults.error_message
  const betweenTags = purifiedIframe[0] === '<' && purifiedIframe[purifiedIframe.length - 1] === '>' 
  
  
  const getEmbed = () => {
    return purifiedIframe &&
      <ResponsiveEmbed
      className="embeded-video" aspectRatio="16by9">
        <div
        dangerouslySetInnerHTML={{__html: purifiedIframe}} />
      </ResponsiveEmbed>

  }

  const formValidationErrorMessage = () => {
    return (!purifiedIframe && iframeString && forFormValidation && show_default_error_message && validation_error_message ) && error_message
  }

  const nonFormValidationMethod = () => {
    return !purifiedIframe && !forFormValidation && show_default_error_message && default_error_message
  }

  const removedItemsMessage = () => {

    return forFormValidation && removed.length > 0 && 
    <ul style={{padding: 0}}>
      The following are not allowed:
      {removed.map((obj, index) =>{
      
      const makeSure = obj.element && obj.element.tagName === "IFRAME" ? "Make sure the tag was coppied correctly: " : ""

      return (
      <li style={{marginLeft: '30px', paddingLeft: 0}} key={index}>
        {makeSure}
        {obj.element ? obj.element.tagName : JSON.stringify(obj)}
      </li>
      )
      
      })}
    </ul>
  }


  return (
    <Fragment>
      {betweenTags && getEmbed()}
      {formValidationErrorMessage()}
      {nonFormValidationMethod()}
      {removedItemsMessage()}
     
    </Fragment>
  )
}

export default IFrame

