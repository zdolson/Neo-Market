import React, { Component } from 'react'
import {Stylesheet} from '../../../../../stylesheet.js'
import sheet from './checkOutPagePrice.scss'

/**

@ Nicholas

@ Date: 03/06/18

Purpose: Component to hold logic/rendering for checkout page pricing

**/

export class CheckOutPagePrice extends Component {
  constructor (props, context) {
    console.log('checkOutPagePrice was created!')
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    return (
      <div className='checkOutPagePrice'>
        {this.props.currCheckOutItemPrice}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPagePrice
