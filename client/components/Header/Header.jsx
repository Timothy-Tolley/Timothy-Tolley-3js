import React from 'react'

import './header.css'

class Header extends React.Component {
  render () {
    return (
      <div className = 'headerContainer'>
        <h1 className = 'headerText'>
          TIMOTHY TOLLEY
        </h1>
        <h1 className = 'secHeaderText'>
          FREELANCE WEB DEVELOPMENT
        </h1>
      </div>
    )
  }
}

export default Header
