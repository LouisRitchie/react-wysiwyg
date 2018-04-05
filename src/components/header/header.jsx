import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

class Header extends Component {
  render() {
    return (
      <div className="headerWrapper">
        <h1>React WYSIWYG</h1>
        <div className="headerCredits">
          <p>By <a href='http://louisritchie.com'>Louis Ritchie</a></p>
          <a href='https://github.com/louisritchie/react-wysiwyg'>View Source</a>
        </div>
      </div>
    )
  }
}

export default Header
