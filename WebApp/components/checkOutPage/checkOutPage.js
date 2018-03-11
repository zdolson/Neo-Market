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
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID
    return (
      <div className="checkOutPage">

        <div className="header">
          <div> Cart </div>
          <div className="cartHeaderLine"></div>
        </div>

        {this.props.cartItems.map( (id, key) => {
          var currCheckOutItem = returnCheckOutDataByID(id)
          return (
            <CheckOutTableItems currCheckOutItem={currCheckOutItem}/>
          )
        })}

        <div className="checkOutBottom">
          <div className="checkOutDetails">
            <div className="checkOutTotalWrapper">
              <div className="checkOutTotal"> Total </div>
              <div className="totalSpace"></div>
              <div className="checkOutTotalValue"> 20 NEO </div>
            </div>
            <div className="checkOutTotalLine"></div>
          </div>
          <div className="purchaseBtn">
            <div className="purchaseBtnText"> Purchase </div>
          </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPage
