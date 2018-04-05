import React, { Component } from 'react'
import Toolbox from 'components/toolbox'
import Grid from 'components/grid'
import './styles.css'

class Workspace extends Component {
  render() {
    return (
      <div className="workspaceWrapper">
        Workspace container.
        <Toolbox />
        <Grid />
      </div>
    )
  }
}

export default Workspace
