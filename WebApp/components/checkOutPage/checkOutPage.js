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
      console.log(this.props);
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
    console.log('purchaseLogic');
    return new Promise((resolve, reject) => {
      if(!this.props.useFirebaseBackend) {
        let cartItems = this.props.cartItems;
        let buyerName = firebase.auth().currentUser.uid;
        if (cartItems.length == 0) {
            // disable purchase button functionality here.
        } else if (cartItems.length == 1) {
            var currCartItem = this.props.returnCheckOutDataByID(cartItems[0])
            var listingOwner = currCartItem['owner'];
            var listingCost = currCartItem['price'];
            listingOwner = listingOwner.replace(/[^\x20-\x7E]/g, '');
            listingCost = listingCost.replace(/[^\x20-\x7E]/g, '');
            cF.purchase(listingOwner, buyerName, listingCost).then(val => {
              // Check val to see if transaction worked or not
              if(val.response.result){
                  var listingID = currCartItem['id'];
                  var listingTitle = currCartItem['title'];
                  var listingDesc = currCartItem['description'];
                  var listingAmount = currCartItem['amount'];
                  var listingImgRef = currCartItem['imageRef'];
                  var listingIsPurchased = currCartItem['isPurchased'];
                  listingOwner = listingOwner.replace(/[^\x20-\x7E]/g, '');
                  listingCost = listingCost.replace(/[^\x20-\x7E]/g, '');
                  listingID = listingID.replace(/[^\x20-\x7E]/g, '');
                  listingTitle = listingTitle.replace(/[^\x20-\x7E]/g, '');
                  listingDesc = listingDesc.replace(/[^\x20-\x7E]/g, '');
                  listingAmount = listingAmount.replace(/[^\x20-\x7E]/g, '');
                  listingImgRef = listingImgRef.replace(/[^\x20-\x7E]/g, '');
                  console.log('listingID: ' + listingID);
                  console.log('listingOwner: ' + listingOwner);
                  console.log('listingTitle: ' + listingTitle);
                  console.log('listingDesc: ' + listingDesc);
                  console.log('listingCost: ' + listingCost);
                  console.log('listingAmount: ' + listingAmount);
                  console.log('listingImgRef: ' + listingImgRef);
                  console.log('listingIsPurchased: ' + listingIsPurchased);
                  cF.editPost(listingID,listingOwner,listingTitle,listingDesc,listingCost,listingAmount,listingImgRef,true)
                    .then(res => {
                      resolve(res);
                    }).catch(err => {
                      reject(err);
                    });
              }else{
                  reject(val);
              }
            }).catch(err => {
              reject(err);
            });
        } else {
            var ownersArray = [];
            var costArray = [];
            var updatePostsArray = [];
            for (let i = 0; i < cartItems.length; i++){
                var currCartItem = this.props.returnCheckOutDataByID(cartItems[i]);
                ownersArray.push(currCartItem['owner'].replace(/[^\x20-\x7E]/g, ''));
                costArray.push(currCartItem['price'].replace(/[^\x20-\x7E]/g, ''));
                updatePostsArray.push(currCartItem);
                // console.log(updatePostsArray[i]);
            }
            console.log('before: ' + ownersArray.length);
            cF.multipurchase(ownersArray, buyerName, costArray, updatePostsArray).then(val => {
              // Check val to see if transaction worked or not
              if(val.response.result){

                  var i = 0;
                  while (i < ownersArray.length && ownersArray[i] !== null){
                      var currentPost = updatePostsArray[i];
                      // var j = i + 1;
                      console.log(ownersArray[i]);
                      console.log('after: ' + ownersArray.length);

                      // below is not necessary I believe
                      // while (j < ownersArray.length && ownersArray[j] !== null){
                      //     console.log(ownersArray[j]);
                      //     if (ownersArray[i] === ownersArray[j]){
                      //         // currentTotalCost += parseInt(costArray[j]);
                      //         console.log('cutting out j: ' + j);
                      //         ownersArray.splice(j, 1);
                      //         updatePostsArray.splice(j, 1);
                      //         continue;
                      //     } else {
                      //         j++;
                      //     }
                      // }
                      // costArray[i] = currentTotalCost;
                      i++;
                  }
                  console.log(updatePostsArray);
                  resolve(val);
              }else{
                  reject(val);
              }
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
