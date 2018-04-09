import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map, take, takeUntil, withLatestFrom } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { pick } from 'ramda'
import Toolbox from 'components/toolbox'
import BackgroundGrid from 'components/backgroundGrid'
import './styles.scss'

const mapStateToProps = state => {
  const entities = state['entities']
  return { entities }
}

class Workspace extends Component {
  state = {
    startCoords: [-1, -1],
    currentCorods: [-1, -1]
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._mouseMove$ = (new Subject()).pipe(map(pick(['pageX', 'pageY'])), takeUntil(this._unmount$))
    this._mouseDown$ = (new Subject()).pipe(map(pick(['pageX', 'pageY'])), takeUntil(this._unmount$))
    this._mouseUp$ = (new Subject()).pipe(map(pick(['pageX', 'pageY'])), takeUntil(this._unmount$))

    this._mouseDown$.subscribe(
      ({pageX, pageY}) => this.setState({ startCoords: [pageX, pageY] })
    )

    this._mouseUp$.subscribe(
      () => this.setState({ startCoords: [-1, -1] })
    )

    this._shapeDrawn$ = this._mouseUp$.pipe(withLatestFrom(this._mouseDown$))

    this._shapeDrawn$.subscribe(
      ([{pageX: x1, pageY: y1}, {pageX: x2, pageY: y2}]) => console.log()
    )
  }

  _mouseDown = event => this._mouseDown$.next(event)
  _mouseUp = event => this._mouseUp$.next(event)
  _mouseMove = event => this._mouseMove$.next(event)

  render() {
    const { top, height, left, width } = getTLHW(this.state.currentCorods, this.state.startCoords)
    console.log(this.props)

    return (
      <div className='workspaceWrapper'>
        <BackgroundGrid />
        <Toolbox />

        <div className='drawArea' onMouseDown={this._mouseDown} onMouseUp={this._mouseUp} onMouseMove={this._mouseMove}>
          {/* iterate over existing objects, placing them on the grid */}

          <div className='currentSelection' style={{top, left, height, width}} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Workspace)

const getTLHW = (currentCoords, startCoords) => {
  let result = [] // [top, left, height, width]

  if (currentCoords[0] > startCoords[0]) {
    result[1] = startCoords[0]
    result[3] = currentCoords[0] - startCoords[0]
  } else {
    result[1] = currentCoords[0]
    result[3] = startCoords[0] - currentCoords[0]
  }

  if (currentCoords[1] > startCoords[1]) {
    result[0] = startCoords[1]
    result[2] = currentCoords[1] - startCoords[1]
  } else {
    result[0] = currentCoords[1]
    result[2] = startCoords[1] - currentCoords[1]
  }

  return { top: result[0], left: result[1], height: result[2], width: result[3] }
}