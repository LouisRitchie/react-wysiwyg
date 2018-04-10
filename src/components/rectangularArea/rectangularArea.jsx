import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.scss'

const mapStateToProps = state => {
  const { settings: gridSize } = state

  return gridSize
}

class RectangularArea extends Component {
  render() {
    const { x, y, height, width, gridSize } = this.props

    return (
      <div
        className='rectangularArea'
        style={{
          top: y * gridSize,
          left: x * gridSize,
          height: height * gridSize,
          width: width * gridSize
        }} />
    )
  }
}

export default connect(mapStateToProps)(RectangularArea)