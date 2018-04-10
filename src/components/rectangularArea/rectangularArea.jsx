import React, { Component } from 'react'
import { connect } from 'react-redux'
import { focusID } from 'actions/selection'
import { Subject } from 'rxjs/Subject'
import { take, takeUntil } from 'rxjs/operators'
import './styles.scss'

const mapStateToProps = state => {
  const { selection, settings: { gridSize } } = state

  return { gridSize, selection }
}

class RectangularArea extends Component {
  state = {
    moveToCoords: [-1, -1]
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseDown$ = (new Subject()).pipe(takeUntil(this._unmount$))
  }

  componentWillUnmount() {
    this._unmount$.next()
  }

  _handleClick = event => {
    event.stopPropagation()
    event.preventDefault()
    this.props.focusID(this.props.id)
  }

  _handleMouseDown = event => event.stopPropagation()
  _handleMouseUp = event => event.stopPropagation()

  render() {
    const {
      props: { x, y, height, width, id, gridSize, selection },
      state: { moveToCoords }
    } = this

    return (
      <React.Fragment>
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
        { moveToCoords[0] !== -1 && <div className='rectangularAreaGhost' /> }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, { focusID })(RectangularArea)