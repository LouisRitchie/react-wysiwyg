import React, { Component } from 'react'
import { filter, pluck, take, takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import Square from './square'
import { orderCoordinates } from './helpers.js'
import './styles.scss'

class Grid extends Component {
  state = {
    coords: [[1, 1], [5, 7]],
    selected: [-1, -1]
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseMove$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))
    this._mouseDown$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))
    this._mouseUp$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))

    this._mouseDown$.subscribe(
      ({x, y}) => this.setState({selected: [Number(x), Number(y)]})
    )

    this._mouseUp$.subscribe(
      () => this.setState({selected: [-1, -1]})
    )

    this._shapeDrawn$ = this._mouseUp$.pipe(
      withLatestFrom(this._mouseDown$),
      filter(([{x: x2, y: y2}, {x: x1, y: y1}]) => x2 !== x1 && y2 !== y1)
    )

    this._shapeDrawn$.subscribe(
      ([{x: x2, y: y2}, {x: x1, y: y1}]) => {
        this.setState({
          coords: orderCoordinates([[Number(x1), Number(y1)], [Number(x2), Number(y2)]]),
          selected: [-1, -1]
        })
      }
    )
  }

  mouseMove = event => this._mouseMove$.next(event)
  mouseDown = event => this._mouseDown$.next(event)
  mouseUp = event => this._mouseUp$.next(event)

  render() {
    console.log('set')
    return (
      <div
        onMouseMove={this.mouseMove}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        className='gridWrapper'
        draggable='false'
        style={{ height: 20 * 20, width: 20 * 20 }}>
        {Array.apply(null, Array(21)).map((_, y) => (
          <div
            key={y}
            className='gridRow'
            draggable='false'
            style={{top: 20 * y - 10}}>
            {Array.apply(null, Array(21)).map((_, x) => (
              <Square coords={this.state.coords} selected={this.state.selected[0] === x && this.state.selected[1] === y} x={x} y={y} key={x} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Grid
