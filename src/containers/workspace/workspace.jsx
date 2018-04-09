import React, { Component } from 'react'
import Toolbox from 'components/toolbox'
import BackgroundGrid from 'components/backgroundGrid'
import './styles.scss'

class Workspace extends Component {
  render() {
    return (
      <div className="workspaceWrapper">
        <BackgroundGrid />
        <Toolbox />
      </div>
    )
  }
}

export default Workspace