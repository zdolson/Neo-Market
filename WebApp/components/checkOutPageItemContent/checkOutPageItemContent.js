import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPageItemContent.scss'

import CheckOutPageAddr from '../checkOutPageAddr/checkOutPageAddr.js'
import CheckOutPagePrice from '../checkOutPagePrice/checkOutPagePrice.js'
import CheckOutPageTitle from '../checkOutPageTitle/checkOutPageTitle.js'

/**

@ Nicholas 

@ Date: 03/06/18

Purpose: A single component that holds the address, price, and title for an item in the checkout page.

**/

export class CheckOutPageItemContent extends Component {
  constructor (props, context) {
    console.log('CheckOutPageItemContent was created.')
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    return (
      <div className='checkOutPageItemContent'>
        <table className='contentTable'>
          <tr><CheckOutPageAddr /></tr>
          <tr><CheckOutPagePrice /></tr>
          <tr><CheckOutPageTitle /></tr>
        </table>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPageItemContent