import React, { Component } from 'react'
import Quadrant from '../quadrant'

class Square extends Component {
  render() {
    const { x, y, selected, coords } = this.props

    return (
      <div
        className={`squareWrapper ${selected[0] === x && selected[1] === y ? 'selected' : ''}`}
        data-x={x}
        data-y={y}
        style={{left: x * 20}}>
        {Array.apply(null, Array(4)).map((_, i) => (
          <Quadrant coords={coords} x={x} y={y} i={i} key={i} />
        ))}
      </div>
    )
  }
}

export default Square