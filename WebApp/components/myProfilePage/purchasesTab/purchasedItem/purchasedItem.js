import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './purchasedItem.scss'

import {pullingDatabaseImage} from '../../../fireBaseFunctions.js'

/**

@ Victoria

@ 04/30/18

Purpose: Component for creating each item in the purchases page

**/

class PurchasedItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render () {
    let {item} = this.props;
    return (
      <div className='item-container'>

        <div className="item-top">
          <div className="item-image">
            <div><img src={item.imageRef} alt='loading...' height="50"/></div>
          </div>
          <div className="item-title">
            {item.title}
          </div>
        </div>

        <div className="item-price">
           <div className="price"> {item.price} </div>
           <div className="neo"> {'NEO'} </div>
        </div>

        <div className="item-bottom">
          <div className="item-description">
            {item.description}
          </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasedItem
