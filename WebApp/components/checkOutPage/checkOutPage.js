import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPage.scss'

import CheckOutTableItems from './checkOutTableItems/checkOutTableItems.js'
import TotalPurchase from './totalPurchase/totalPurchase.js'
import CheckOutPageTotalValue from './checkOutPageTotalValue/checkOutPageTotalValue.js'
import cF from '../../../backend/contractFunctions'

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
    this.purchaseLogic = this.purchaseLogic.bind(this);
  }

  purchaseLogic = () => {
      //If there is more than one item in the cart then do for loop, else just fire function once.
      // nick put shit here.
      //if 0 items, lock/gray button
      //elif 1 item, fire one cF.purchase()
      //else more than 1 item, fire multiple cF.purchase().
  }

  render () {
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID
    var removeCartItem = this.props.removeCartItem
    var sumTotalCartItems = this.props.sumTotalCartItems
    var tryAgain = this.props.tryAgain

    return (
      <div className="checkOutPage">

        <div className="header">
          <div> Cart </div>
          <div className="cartHeaderLine"></div>
        </div>

        {this.props.cartItems.map( (id, key) => {
          var currCheckOutItem = returnCheckOutDataByID(id)
          return (
            <CheckOutTableItems tryAgain={tryAgain} currCheckOutItem={currCheckOutItem} removeCartItem={removeCartItem}/>
          )
        })}

        <div className="checkOutBottom">
          <div className="checkOutDetails">
            <div className="checkOutTotalWrapper">
              <div className="checkOutTotal"> Total </div>
              <div className="totalSpace"></div>
              <div className="checkOutTotalValue"> {sumTotalCartItems()} </div>
            </div>
            <div className="checkOutTotalLine"></div>
          </div>
          <div className="purchaseBtn" onClick={this.purchaseLogic}>
            <div className="purchaseBtnText"> Purchase </div>
          </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPage
