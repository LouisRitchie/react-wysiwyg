import React, { Component } from 'react'
import { isQuadrantColoured } from '../helpers'

class Quadrant extends Component {
  render() {
    const { x, y, i, coords } = this.props

    return (
      <div
        className={`quadrant  ${isQuadrantColoured([x, y, i + 1], coords) ? 'coloured' : ''}`}
        data-x={x}
        data-y={y}
        data-i={i}
        style={{
          left: (i % 2) * 10,
          top: i > 1 ? 10 : 0
        }} />
    )
  }
}

export default Quadrant