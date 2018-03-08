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
      <div className='moreInfoListingText'>
        <ListingPic />
        <MoreInfoListingFields/>
      </div>
    )
  }
}

export default MoreInfoListing
