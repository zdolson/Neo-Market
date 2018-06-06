import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPage.scss'

import WifModal from '../wifModal/wifModal.js'

import CheckOutTableItems from './checkOutTableItems/checkOutTableItems.js'
import TotalPurchase from './totalPurchase/totalPurchase.js'
import CheckOutPageTotalValue from './checkOutPageTotalValue/checkOutPageTotalValue.js'
import cF from '../../neonFunctions/contractFunctions'
import { makePurchase } from '../fireBaseFunctions'

import * as firebase from 'firebase'

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
    this.purchaseLogic = this.purchaseLogic.bind(this);
    this.verificationSuccess = this.verificationSuccess.bind(this);
  }

  openModal() {
    this.setState({modal_is_open: true});
  }

  closeModal() {
    this.setState({modal_is_open: false});
  }

  verificationSuccess = () => {

    this.purchaseLogic().then(val => {
      console.log(val);
      var that = this;
      makePurchase(this.props.cartItems, that).then(function() {
        for(var i=0; i<that.props.cartItems.length;i++) {
          that.props.addToMyPurchases(that.props.cartItems[i])
          that.props.removeItemFromNonPurchasedList(that.props.cartItems[i])
        }
        that.props.resetCartItemState()
      });
    }).catch(err => {
      console.error(err);
    });

  }

  purchaseLogic = () => {
    return new Promise((resolve, reject) => {
      if(!this.props.useFirebaseBackend) {
        let buyerName = firebase.auth().currentUser.uid;
        if (cartItems.length == 0) {
            // disable purchase button functionality here.
        } else if (cartItems.length == 1) {
            var currCartItem = returnCheckOutDataByID(cartItems[0])
            var listingOwner = currCartItem['owner'];
            var listingCost = currCartItem['price'];
            listingOwner = listingOwner.replace(/[^\x20-\x7E]/g, '');
            listingCost = listingCost.replace(/[^\x20-\x7E]/g, '');
            cF.purchase(listingOwner, buyerName, listingCost).then(val => {
              resolve(val);
            }).catch(err => {
              reject(err);
            });
        } else {
            var ownersArray = [];
            var costArray = [];
            for (let i = 0; i < cartItems.length; i++){
                var currCartItem = returnCheckOutDataByID(cartItems[i]);
                ownersArray.push(currCartItem['owner'].replace(/[^\x20-\x7E]/g, ''));
                costArray.push(currCartItem['price'].replace(/[^\x20-\x7E]/g, ''));
            }
            cF.multipurchase(ownersArray, buyerName, costArray).then(val => {
              resolve(val);
            }).catch(err => {
              reject(err);
            });
        }
      }
    });
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
            <CheckOutTableItems key={key} currCheckOutItem={currCheckOutItem} removeCartItem={removeCartItem}/>
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
          <div className="purchaseBtn" onClick={this.openModal}>
            <div className="purchaseBtnText"> Purchase </div>
          </div>
        </div>

        <WifModal modal_is_open={modal_is_open} closeModal={this.closeModal} verificationSuccess={this.verificationSuccess}/>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPage
