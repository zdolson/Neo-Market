import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './moreInfoListingSpec.scss'

import ItemSpecsLine from '../../../assets/ItemSpecsLine.svg'
import Star from '../../../assets/Star.svg'

/**

@ Alec/Nicholas

@ 3/09/18

Purpose: Specifications of the item, as well as passing in props to dynamically populate each listing Item

**/

class MoreInfoListingSpec extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    let item = this.props.item;
    let itemID = this.props.item['id'];
    let addCartItem = this.props.addCartItem;
    let removeItem = this.props.removeItem;
    console.log(this.props);
    return (
      <div className='moreInfoListingSpec'>

        <div className="titleAndPrice">
          <div className="title">
            {item['title']}
          </div>
          <div className="prices">
            <div className="neoPrice"> {item['price']} </div>
            <div className="usPrice"> US price </div>
          </div>
        </div>

        <div className="shippingDetails">
          <div className="shipsTo"> ships to blah </div>
          <div> 3-4 days </div>
        </div>

        <div className="sellerAndRating">
          <div className="seller">
            seller
          </div>
          <div className="rating">
            rating <Star />
          </div>
        </div>

        <div className="itemSpecsLine"> <ItemSpecsLine /> </div>

        <div className="btnContainer">
          <div className="cartBtn">
            <div className="itemBtnText" onClick={() => {addCartItem(itemID)}}>
              Add to Cart
            </div>
          </div>
          <div className="removeBtn">
            <div className="itemBtnText" onClick={() => {removeItem(itemID)}}>
              Remove Item
            </div>
          </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingSpec
