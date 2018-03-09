import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './moreInfoListingFields.scss'

import SellerRating from '../assets/SellerRating.svg'
import SellerStar from '../assets/SellerStar.svg'

import Galaxy from '../assets/galaxy.svg'
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

  addItem  = () => {
    console.log("addItem");
  }

  render () {
    return (
      <div className='MoreInfoListingFields'>
        <Stylesheet sheet={sheet} />
        <div className='moreInfoListingTitle'>
          <h2>Test Item 1</h2>
            <div className ='stuffies'>
              <p>Shipping and Handling Info Here.</p>
              <p>Ship Anywhere In the US and Canada!</p>
            </div>
        </div>

        <div className='moreInfoListingPicture'>
          <Galaxy className="galaxy"/>
          <Stylesheet sheet={sheet} />
        </div>

        <div className='moreInfoListingDescription'>
          <h2>Selling My Grumpy Cat! Near-to-mint condition!</h2>
          <p>Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever. Elinor her his secure far twenty eat object. Late any far saw size want man. Which way you wrong add shall one. As guest right of he scale these. Horses nearer oh elinor of denote.</p>
        </div>
      
        <div className='moreInfoListingDescription'>
          <h2> Description </h2>
        </div>

        <div className='moreInfoListingSeller'>
          <SellerRating className="sellerRating"/>
          <h3>Seller A</h3>
        </div>

        <div className='purchaseBtn' onClick={this.addItem}>
          hello! click me to purchase this item!
        </div>
      </div>
    )
  }
}

export default MoreInfoListingFields
