import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listings.scss'
import Listing from '../listing/listing.js'

/**

@ Alec

@ 2/27/18

@ Purpose: Container providing dynamic spacing and sizing of the listings grid

TODO: do we need to add props logic?

**/

export class CheckOutTableItems extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div class='checkoutItems'>
      <CheckOutTableItem />
      <CheckOutTableItem />
      <CheckOutTableItem />
      </div>
    )
  }
}

export default CheckOutTableItems;
