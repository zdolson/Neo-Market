import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPage.scss'

import CheckOutTableItems from '../checkOutTableItems/checkOutTableItems.js'
import TotalPurchase from '../totalPurchase/totalPurchase.js'
import CheckOutPageTotalValue from '../checkOutPageTotalValue/checkOutPageTotalValue.js'

/**

@ Nicholas 

@ Date: 03/06/18

Purpose: Component that holds all of the components that is the checkOutPage.

**/

export class CheckOutPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    return (
      <div className="checkOutPage">
        <div className="header">
          <h1> Items </h1>
        </div>

        <CheckOutTableItems />
        
        <div className="checkOutTotal">
          <h1> Total:  </h1>
        </div>

        <div className="checkOutTotalValue">
          <CheckOutPageTotalValue />
        </div>

        <div className="purchaseButton">
          <h1> <TotalPurchase /> </h1>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPage
