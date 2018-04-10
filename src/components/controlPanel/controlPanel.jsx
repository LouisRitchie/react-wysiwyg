import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGridSize } from 'actions/settings'
import { Subject } from 'rxjs/Subject'
import { interval } from 'rxjs/observable/interval'
import { distinctUntilChanged, map, pluck, take, takeUntil, withLatestFrom } from 'rxjs/operators'
import { last } from 'ramda'
import icons from 'static'
import './styles.scss'

class ControlPanel extends Component {
  componentDidMount() {
    this._unmount$ = (new Subject()).pipe(take(1))
    this._rangeChange$ = (new Subject()).pipe(pluck('target', 'value'), takeUntil(this._unmount$))

    this._updateGrid$ = interval(200).pipe(withLatestFrom(this._rangeChange$), map(last), distinctUntilChanged())

    this._updateGrid$.subscribe(value => this.props.setGridSize(value))
  }

  componentWillUnmount() {
    this._unmount$.next()
  }

  _handleRangeChange = event => this._rangeChange$.next(event)

  render() {
    return (
      <div className='controlPanelContainer'>
        <div className='windowControls'>
          {icons.enlarge}
        </div>
        <div className='controlItem'>
          <label><em>grid size</em></label>
          <input onChange={this._handleRangeChange} defaultValue='20' type='range' />
        </div>
      </div>
    )
  }
}

export default connect(null, { setGridSize })(ControlPanel)