import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './purchasesTab.scss'
import PurchasedItem from './purchasedItem/purchasedItem.js'

/**

@ Victoria

@ 04/20/2018

Purpose: Component page for logic/render for the purchases page.

**/

class PurchasesTab extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    let items = this.props.state.items;
    var myPurchases = this.props.state.myPurchases;
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID;
    console.log(myPurchases)
    // Taking the myPurchases param passed in from app, goes through 
    // the list and gets the item information corresponding to listingID.
    var purchasesList = []
    for(var i = 0; i < myPurchases.length; i++) {
      console.log(myPurchases[i])
      var currPurchases = returnCheckOutDataByID(myPurchases[i])
      purchasesList.push(currPurchases)
    }
    console.log(purchasesList)
    return (
      <div className="purchasesPageContainer">

        {purchasesList.map( (item, key) => {
          return (
            <PurchasedItem key={key} item={item}/>
          );
        })}

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasesTab
