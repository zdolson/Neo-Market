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
    console.log(this.props);
    let items = this.props.state.items;
    var myPurchases = this.props.state.myPurchases;
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID;
    var nonPurchasedItems = this.props.nonPurchasedItems;

    // Taking the myPurchases list passed in and goes through
    // the list and gets the item information corresponding to listingID.
    var purchasesList = []
    for(var i = 0; i < myPurchases.length; i++) {
      var currPurchases = returnCheckOutDataByID(myPurchases[i])
      purchasesList.push(currPurchases)
    }

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
