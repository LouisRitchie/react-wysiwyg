import React, { Component } from 'react'
import Quadrant from '../quadrant'
import { isQuadrantColoured, getQuadrantBorderStyle } from '../helpers'

class Square extends Component {
  render() {
    const { x, y } = this.props

    return (
      <div
        className={`squareWrapper` /*${this.state.selected[0] === j && this.state.selected[1] === i ? 'selected' : ''}*/}
        data-x={x}
        data-y={y}
        style={{left: x * 20}}>
        {Array.apply(null, Array(4)).map((_, i) => (
          <Quadrant x={x} y={y} i={i} key={i} />
        ))}
      </div>
    )
  }
}

export default Square