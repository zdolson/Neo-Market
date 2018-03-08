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
      <div class='MoreInfoListingFields'>
      <Stylesheet sheet={sheet} />
        <div class='moreInfoListingTitle'>
          <h2>Test Item 1</h2>
          <div class ='stuffies'>
            <p>Shipping and Handling Info Here.</p>
            <p>Ship Anywhere In the US and Canada!</p>
          </div>
        </div>

        <div class='moreInfoListingDescription'>
        <h2>Selling My Grumpy Cat! Near-to-mint condition!</h2>
        <p>Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever. Elinor her his secure far twenty eat object. Late any far saw size want man. Which way you wrong add shall one. As guest right of he scale these. Horses nearer oh elinor of denote.</p>
        </div>

        <div class='moreInfoListingPrice'>
          <h2>30 N</h2>
        </div>

        <div class='moreInfoListingSeller'>
          <SellerRating className="sellerRating"/>
          <h3>Seller A</h3>
        </div>

        <div class='purchaseBtn'>
        <button>hello! click me to purchase this item!</button>
        </div>
      </div>
    )
  }
}

export default MoreInfoListingFields
