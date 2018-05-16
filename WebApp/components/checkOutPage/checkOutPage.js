import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPage.scss'

import WifModal from '../wifModal/wifModal.js'

import CheckOutTableItems from './checkOutTableItems/checkOutTableItems.js'
import TotalPurchase from './totalPurchase/totalPurchase.js'
import CheckOutPageTotalValue from './checkOutPageTotalValue/checkOutPageTotalValue.js'
import cF from '../../neonFunctions/contractFunctions'
import { registerUserToDatabase } from '../fireBaseFunctions'

import * as firebase from 'firebase'

// import * as firebase from 'firebase'

/**

@ Nicholas

@ Date: 03/06/18

Purpose: Component that holds all of the components that is the checkOutPage.

**/

export class CheckOutPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      modal_is_open: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.purchaseLogic = this.purchaseLogic.bind(this)
  }

  openModal() {
    console.log("openModal()");
    this.setState({modal_is_open: true});
  }

  closeModal() {
    console.log("closeModal()");
    this.setState({modal_is_open: false});
  }

  purchaseLogic(cartItems, users, returnCheckOutDataByID, that){
    var buyerName;
    firebase.database().ref('Users/'+firebase.auth().currentUser.uid).once('value')
      .then( (snapshot) => {
        buyerName = snapshot.val().userName;
        console.log(buyerName);
      }
    );
    if (cartItems.length == 0) {
        // disable purchase button functionality here.
    } else if (cartItems.length == 1) {
        var currCartItem = returnCheckOutDataByID(cartItems[0])
        var listingOwner = currCartItem['owner'];
        var listingCost = currCartItem['price'];
        listingOwner = listingOwner.replace(/[^\x20-\x7E]/g, '');
        listingCost = listingCost.replace(/[^\x20-\x7E]/g, '');
        cF.purchase(listingOwner, buyerName, listingCost);
    } else {
        var ownersArray = [];
        var costArray = [];
        for (let i = 0; i < cartItems.length; i++){
            var currCartItem = returnCheckOutDataByID(cartItems[i]);
            ownersArray.push(currCartItem['owner'].replace(/[^\x20-\x7E]/g, ''));
            costArray.push(currCartItem['price'].replace(/[^\x20-\x7E]/g, ''));
        }
        cF.multipurchase(ownersArray, buyerName, costArray);
    }
  }


  render () {
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID
    var removeCartItem = this.props.removeCartItem
    var sumTotalCartItems = this.props.sumTotalCartItems
    var cartItems = this.props.cartItems
    var users = this.props.users

    const { modal_is_open } = this.state;

    return (
      <div className="checkOutPage">

        <div className="header">
          <div> Cart </div>
          <div className="cartHeaderLine"></div>
        </div>

        {this.props.cartItems.map( (id, key) => {
          var currCheckOutItem = returnCheckOutDataByID(id)
          return (
            <CheckOutTableItems currCheckOutItem={currCheckOutItem} removeCartItem={removeCartItem}/>
          )
        })}

        {this.purchaseLogic(cartItems, users, returnCheckOutDataByID, this)}

        <div className="checkOutBottom">
          <div className="checkOutDetails">
            <div className="checkOutTotalWrapper">
              <div className="checkOutTotal"> Total </div>
              <div className="totalSpace"></div>
              <div className="checkOutTotalValue"> {sumTotalCartItems()} </div>
            </div>
            <div className="checkOutTotalLine"></div>
          </div>
          <div className="purchaseBtn" onClick={this.openModal}>
            <div className="purchaseBtnText"> Purchase </div>
          </div>
        </div>

        <WifModal modal_is_open={modal_is_open} closeModal={this.closeModal} handleSubmit={this.handleSubmit}/>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPage
