import React from 'react'
import Menu from '../../4_Components/menus/Menu'

const LayoutOne = ({children, showTop=false}) => {

  return (
    <div className='layout-one'>
      <Menu />
      {showTop &&
      <div className="layout-one-top">
        <h1>Layout One</h1>
      </div>}
      <div className="layout-one-content">
        {children}
      </div>
    </div>
  )
}

export default LayoutOne
