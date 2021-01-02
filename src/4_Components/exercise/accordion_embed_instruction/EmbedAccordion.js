import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import share from '../../../images/share-button.png'
import embed from '../../../images/embed-button.png'
import copy from '../../../images/copy-button.png'

const EmbedAccordion = () => {
  return (
    <Accordion className='embed-accordion'>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
           How do I find the iframe tag to embed a YouTube video?
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="step step-one">
              <h4>Step 1: </h4>
              <p>Click the share button at the bottom of any YouTube video</p>
              <Image src={share} alt=""/>
            </div>
            <div className="step step-two">
              <h4>Step 2: </h4>
              <p>Choose "Embed"</p>
              <Image src={embed} alt=""/>
            </div>
            <div className="step step-three">
              <h4>Step 3: </h4>
              <p>Click the "Copy" button at the bottom right. It should automatically highlight the ifram tag, 
                if not copy/paste the old fashioned way. Paste the tag in the textarea labeled </p>
              <Image src={copy} alt=""/>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default EmbedAccordion
