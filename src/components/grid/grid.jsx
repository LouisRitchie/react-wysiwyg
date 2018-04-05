import React, { Component } from 'react'
import { append, concat, slice } from 'ramda'
import { Observable } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import './styles.scss'

class Grid extends Component {
  state = {
    coords: [ [0, 0], [0, 0] ]
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseDown$ = (new Subject()).pipe(takeUntil(this._unmount$))
    this._mouseUp$ = (new Subject()).pipe(takeUntil(this._unmount$))

    this._dragStart$ = this._mouseDown$
    this._dragEnd$ = this._mouseUp$

    this._dragStart$.subscribe(
      ({x, y}) => {
        this.setState({
          coords: append([x, y], slice(-20, 21, this.state.coords))
        })
      }
    )

    this._dragEnd$.subscribe(({x, y}) => {
      this.setState({
        coords: concat([[x, y], [x, y]], slice(-20, 21, this.state.coords))
      })
    })
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

  _onMouseDown = () => this._mouseDown$.next()

  _onMouseUp = () => this._mouseUp$.next()

  render() {
    return (
      <div
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        className='gridWrapper'
        style={{ height: 20 * 20, width: 20 * 20 }}>
        {Array.apply(null, Array(21)).map((_, i) => (
          <div key={i} className='gridRow' style={{top: 20 * i - 10}}>
            {Array.apply(null, Array(21)).map((_, j) => (
              <div key={j} className='square' style={{left: j * 20}}>
                {Array.apply(null, Array(4)).map((_, k) => (
                  <div key={k} className='quadrant' style={{left: (k % 2) * 10, top: k > 1 ? 10 : 0}} />
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