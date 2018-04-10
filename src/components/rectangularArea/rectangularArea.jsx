import React, { Component } from 'react'
import { connect } from 'react-redux'
import { focusID } from 'actions/selection'
import './styles.scss'

const mapStateToProps = state => {
  const { selection, settings: { gridSize } } = state

  return { gridSize, selection }
}

class RectangularArea extends Component {
  _handleClick = event => {
    event.stopPropagation()
    event.preventDefault()
    this.props.focusID(this.props.id)
  }

  _handleMouseDown = event => event.stopPropagation()
  _handleMouseUp = event => event.stopPropagation()

  render() {
    const { x, y, height, width, id, gridSize, selection } = this.props

    return (
      <div
        className={`rectangularArea ${selection.includes(id) ? 'selected' : ''}`}
        onClick={this._handleClick}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        style={{
          top: y * gridSize,
          left: x * gridSize,
          height: height * gridSize,
          width: width * gridSize
        }} />
    )
  }
}

export default connect(mapStateToProps, { focusID })(RectangularArea)