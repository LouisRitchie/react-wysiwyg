import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.scss'

const mapStateToProps = state => {
  const { gridSize } = state.settings

  return { gridSize }
}

class BackgroundGrid extends Component {
  render() {
    const { gridSize } = this.props

    return <React.Fragment>
      <div className='verticalGrid' style={{background: `repeating-linear-gradient(to right, #eee 0px, #eee 1px, transparent 1px, transparent ${gridSize}px`}} />
      <div className='horizontalGrid' style={{background: `repeating-linear-gradient(180deg, #eee 0px, #eee 1px, transparent 1px, transparent ${gridSize}px`}} />
    </React.Fragment>
  }
}

export default connect(mapStateToProps)(BackgroundGrid)
