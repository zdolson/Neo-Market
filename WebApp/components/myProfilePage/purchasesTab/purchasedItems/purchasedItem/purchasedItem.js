import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './purchasedItem.scss'


/**

@ Victoria

@ 04/30/18

Purpose: Component for creating each item in the purchases page

**/

class PurchasedItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='purchasedItemBox'>

        <div className='itemTopHalf'>
          <div className="title">Title</div>
          <div className="description">Buy my particle accelator! Mint-condition.</div>
        </div>

        <div className='itemBottomHalf'>
          <div className="seller">Seller: Bill Nye, The Science Guy</div>
        </div>

        <div className='itemPrice'>
          <div className="price">100 NEO</div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasedItem
