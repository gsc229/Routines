import React from 'react'
import LandingMenu from '../../4_Components/menus/LandingMenu'

const LandingPageLayout = ({children, showTop=false}) => {

  return (
    <div className='layout-one'>
      <LandingMenu />
      {showTop &&
      <div className="landing-page-layout">
        <h1>Landing Page Layout</h1>
      </div>}
      <div className="layout-one-content">
        {children}
      </div>
    </div>
  )
}

export default LandingPageLayout
