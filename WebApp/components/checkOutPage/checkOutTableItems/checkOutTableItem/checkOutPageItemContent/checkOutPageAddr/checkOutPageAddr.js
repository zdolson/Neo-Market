import React, { Component } from 'react'
import {Stylesheet} from '../../../../../stylesheet.js'
import sheet from './checkOutPageAddr.scss'

/**

@ Nicholas

@ Date: 03/06/18

Purpose: Component to hold the logic for getting addresses

**/

export class CheckOutPageAddr extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    return (
      <div className='checkOutPageAddr'>
        {this.props.currCheckOutItemOwner}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPageAddr
