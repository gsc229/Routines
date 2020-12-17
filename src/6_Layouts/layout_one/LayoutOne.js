import React from 'react'
import Menu from '../../4_Components/menu/Menu'

const LayoutOne = ({children, showTop=true}) => {

  return (
    <div className='layout-one-container'>
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
