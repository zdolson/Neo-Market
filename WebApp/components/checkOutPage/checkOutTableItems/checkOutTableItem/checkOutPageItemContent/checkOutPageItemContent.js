import React, { Component } from 'react'
import {Stylesheet} from '../../../../stylesheet.js'
import sheet from './checkOutPageItemContent.scss'

import CheckOutPageAddr from './checkOutPageAddr/checkOutPageAddr.js'
import DeleteCartItem from '../../../../assets/DeleteCartItem.svg'

/**

@ Nicholas

@ Date: 03/06/18

Purpose: A single component that holds the address, price, and title for an item in the checkout page.

**/

export class CheckOutPageItemContent extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    var currCheckOutItem = this.props.currCheckOutItem
    let currPrice = (Math.round((currCheckOutItem['price'] * this.props.neoPrice) * 100) / 100);

    return (
      <div className='checkOutPageItemContent'>
        <div className='currItemTitle'>
          {currCheckOutItem['title']}
        </div>

        <div className='currItemOwner'>
          <CheckOutPageAddr currCheckOutItemOwner={currCheckOutItem['owner']}/>
        </div>

        <div className='currItemPriceNeo'>
          Neo: {currCheckOutItem['price']}
        </div>

        <div className='currItemPriceUS'>
          USD: {currPrice}
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPageItemContent
