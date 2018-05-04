import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './purchasedItems.scss'
import PurchasedItem from './purchasedItem/purchasedItem.js'

/**

@ Victoria

@ 04/30/18

@ Purpose: Items container for each purchase

**/

export class PurchasedItems extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div className='purchasedItems'>
        <PurchasedItem />
        <PurchasedItem />
        <PurchasedItem />
      </div>
    )
  }
}

export default PurchasedItems;
