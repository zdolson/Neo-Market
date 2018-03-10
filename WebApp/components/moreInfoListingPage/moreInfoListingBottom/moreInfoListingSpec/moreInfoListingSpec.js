import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './moreInfoListingSpec.scss'

import ItemSpecsLine from '../../../assets/ItemSpecsLine.svg'
import Star from '../../../assets/Star.svg'

/**

@ Alec

@ 3/09/18

Purpose: Specifications of the item

**/

class MoreInfoListingSpec extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='moreInfoListingSpec'>

        <div className="titleAndPrice">
          <div className="title">
            title
          </div>
          <div className="prices">
            <div className="neoPrice"> Neo price </div>
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

        <div className="itemBtn">
          <div className="itemBtnText"> Add to Cart </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingSpec
