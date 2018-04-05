import React, { Component } from 'react'
import { append, concat, head, slice } from 'ramda'
import { Observable } from 'rxjs'
import { map, take, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import './styles.css'

class Grid extends Component {
  state = {
    coords: [ [0, 0], [0, 0] ]
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._dragStart$ = Observable.combineLatest(
      Observable.fromEvent(this.refs.drawarea, 'mousedown'),
      Observable.fromEvent(this.refs.drawarea, 'mousemove')
    ).pipe(takeUntil(this._unmount$), map(head))
    this._dragEnd$ = Observable.combineLatest(
      Observable.fromEvent(this.refs.drawarea, 'mouseup'),
      Observable.fromEvent(this.refs.drawarea, 'mousemove')
    ).pipe(takeUntil(this._unmount$), map(head))

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

  render() {
    return (
      <div ref='drawarea' onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className='gridWrapper'>
        {this.state.coords.slice(1).map((currentCoords, i , coords) => (
          <div key={i} style={this.getTLHW(currentCoords, coords[i])} className='drawing' />
        ))}
      </div>
    )
  }
}

export default Grid