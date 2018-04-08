import React, { Component } from 'react'
import { Observable } from 'rxjs'
import { pluck, take, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import Square from './square'
import { orderCoordinates } from './helpers.js'
import './styles.scss'

class Grid extends Component {
  state = {
    coords: [[1, 1], [5, 7]],
    selected: [-1, -1],
    hovered: [-1, -1]
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseMove$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))
    this._mouseDown$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))
    this._mouseUp$ = (new Subject()).pipe(pluck('target', 'dataset'), takeUntil(this._unmount$))

    this._mouseDown$.subscribe(
      ({x, y}) => {
        this.setState({selected: [Number(x), Number(y)]})
      }
    )

    this._shapeDrawn$ = Observable.zip(
      this._mouseDown$,
      this._mouseUp$
    )

    this._updateHover$ = Observable.zip(
      Observable.timer(1000, 500),
      this._mouseMove$
    )

    this._shapeDrawn$.subscribe(
      ([{x: x1, y: y1}, {x: x2, y: y2}]) => {
        this.setState({
          coords: orderCoordinates([[Number(x1), Number(y1)], [Number(x2), Number(y2)]]),
          selected: [-1, -1]
        })
      }
    )

    this._updateHover$.subscribe(
      ([_, {x, y}]) => this.setState({hovered: [Number(x), Number(y)]})
    )
  }

  mouseMove = event => this._mouseMove$.next(event)
  mouseDown = event => this._mouseDown$.next(event)
  mouseUp = event => this._mouseUp$.next(event)

  render() {
    return (
      <div
        onMouseMove={this.mouseMove}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        className='gridWrapper'
        style={{ height: 20 * 20, width: 20 * 20 }}>
        {Array.apply(null, Array(21)).map((_, y) => (
          <div
            key={y}
            className='gridRow'
            style={{top: 20 * y - 10}}>
            {Array.apply(null, Array(21)).map((_, x) => (
              <Square coords={this.state.coords} selected={this.state.selected} x={x} y={y} key={x} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Grid