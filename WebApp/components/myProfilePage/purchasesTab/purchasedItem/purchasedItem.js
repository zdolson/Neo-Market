import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
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
    let item = this.props.item;
    return (
      <div className='item-container'>

        <div className="item-top">
        </div>

        <div className="item-price">
           { item.price } NEO
        </div>

        <div className="item-bottom">
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasedItem
