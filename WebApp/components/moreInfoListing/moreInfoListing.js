import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './moreInfoListing.scss'
import ListingPic from '../listingPic/listingPic.js'
import MoreInfoListingFields from '../moreInfoListingFields/moreInfoListingFields.js'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for text withing a ListingContent

TODO: props logic so parent ListingContent can dynamically assign text

**/

class MoreInfoListing extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div class='moreInfoListingText'>
      <div>
        <ListingPic />
      </div>
        <div class='description'>
        <h2>Selling My Grumpy Cat! Near-to-mint condition!</h2>
        <p>Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever. Elinor her his secure far twenty eat object. Late any far saw size want man. Which way you wrong add shall one. As guest right of he scale these. Horses nearer oh elinor of denote.</p>
        <Stylesheet sheet={sheet} />
        </div>
        <MoreInfoListingFields/>
      </div>
    )
  }
}

export default MoreInfoListing
