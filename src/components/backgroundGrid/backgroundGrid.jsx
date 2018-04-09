import React, { Component } from 'react'
import './styles.scss'

class RectangularArea extends Component {
  render() {
    return <React.Fragment>
      <div className='verticalGrid' style={{background: 'repeating-linear-gradient(to right, #ddd 0px, #ddd 1px, transparent 1px, transparent 20px'}} />
      <div className='horizontalGrid' style={{background: 'repeating-linear-gradient(180deg, #ddd 0px, #ddd 1px, transparent 1px, transparent 20px'}} />
    </React.Fragment>
  }
}

export default RectangularArea