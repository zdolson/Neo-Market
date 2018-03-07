import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutItem.scss'

/**

@ Nicholas

@ 03/07/18

@ Purpose: 

**/

export class CheckOutItem extends Component {
  constructor (props, context) {
    console.log('Was created!')
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    return (
      <div className='checkOutItem'>
        CheckoutItem
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutItem