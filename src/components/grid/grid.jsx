import React, { Component } from 'react'
import { append, concat, slice } from 'ramda'
import { Observable } from 'rxjs'
import { pluck, take, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import './styles.scss'

class Grid extends Component {
  state = {
    coords: [[1, 1], [5, 7]]
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseDown$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))
    this._mouseUp$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))

    this._shapeDrawn$ = Observable.zip(
      this._mouseDown$,
      this._mouseUp$
    )

    this._shapeDrawn$.subscribe(
      ([{x: x1, y: y1}, {x: x2, y: y2}]) => {
        this.setState({
          coords: this._orderCoordinateSet([[Number(x1), Number(y1)], [Number(x2), Number(y2)]])
        })
      }
    )
  }

  getTLHW = (currentCoords, prevCoords) => {
    let result = [] // [top, left, height, width]

    if (currentCoords[0] > prevCoords[0]) {
      result[1] = prevCoords[0]
      result[3] = currentCoords[0] - prevCoords[0]
    } else {
      result[1] = currentCoords[0]
      result[3] = prevCoords[0] - currentCoords[0]
    }

    if (currentCoords[1] > prevCoords[1]) {
      result[0] = prevCoords[1]
      result[2] = currentCoords[1] - prevCoords[1]
    } else {
      result[0] = currentCoords[1]
      result[2] = prevCoords[1] - currentCoords[1]
    }

    return { top: result[0], left: result[1], height: result[2], width: result[3] }
  }

  _onMouseDown = event => this._mouseDown$.next(event)

  _onMouseUp = event => this._mouseUp$.next(event)

  _isQuadrantColoured = ([x, y, i]) => {
    const [ [x1, y1], [x2, y2] ] = this.state.coords

    if (x === x1 && y === y1) { return i === 4 }
    if (x === x2 && y === y1) { return i === 3 }
    if (x === x1 && y === y2) { return i === 2 }
    if (x === x2 && y === y2) { return i === 1 }
    if (x > x1 && x < x2) {
      if (y === y1) { return ( i === 3 || i === 4 ) }
      if (y === y2) { return ( i === 1 || i === 2 ) }
      if (y > y1 && y < y2) { return true }
    }
    if (y > y1 && y < y2) {
      if (x === x1) { return ( i === 2 || i === 4 ) }
      if (x === x2) { return ( i === 1 || i === 3 ) }
      if (x > x1 && x < x2) { return true }
    }
  }

  _orderCoordinateSet = ([[x1, y1], [x2, y2]]) => {
    if (x1 < x2 && y1 < y2) { return [[x1, y1], [x2, y2]] }
    if (x1 > x2 && y1 < y2) { return [[x2, y1], [x1, y2]] }
    if (x1 < x2 && y1 > y2) { return [[x1, y2], [x2, y1]] }
    return [[x2, y2], [x1, y1]]
  }

  render() {
    return (
      <div
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        className='gridWrapper'
        style={{ height: 20 * 20, width: 20 * 20 }}>
        {Array.apply(null, Array(21)).map((_, i) => (
          <div
            key={i}
            className='gridRow'
            style={{top: 20 * i - 10}}>
            {Array.apply(null, Array(21)).map((_, j) => (
              <div
                key={j}
                className='square'
                style={{left: j * 20}}>
                {Array.apply(null, Array(4)).map((_, k) => (
                  <div
                    key={k}
                    className={`quadrant ${this._isQuadrantColoured([j, i, k + 1]) ? 'coloured' : ''}`}
                    data-x={j}
                    data-y={i}
                    style={{left: (k % 2) * 10, top: k > 1 ? 10 : 0}} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Grid