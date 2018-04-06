import React, { Component } from 'react'
import { isQuadrantColoured, getQuadrantBorderStyle } from '../helpers'

class Quadrant extends Component {
  render() {
    const { x, y, i } = this.props

    return (
      <div
        className={`quadrant ${isQuadrantColoured([x, y, i + 1]) ? 'coloured' : ''}`}
        data-x={x}
        data-y={y}
        style={{
          left: (i % 2) * 10,
          top: i > 1 ? 10 : 0
        }} />
    )
  }
}

export default Quadrant