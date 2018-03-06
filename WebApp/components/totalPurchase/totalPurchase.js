import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './moreInfoListingFields.scss'

import SellerRating from '../assets/SellerRating.svg'

/**

@ Victoria

@ 3/4/18

Purpose: Reusable component for text withing a ListingContent

TODO: props logic so parent ListingContent can dynamically assign text

**/

class MoreInfoListingFields extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <Stylesheet sheet={sheet} />
        <div class='purchaseBtn'>
        <button>Purchase</button>
        </div>
        <div></div>
    )
  }
}

export default MoreInfoListingFields
