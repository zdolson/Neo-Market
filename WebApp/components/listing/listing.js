import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listing.scss'
import ListingContent from '../listingContent/listingContent.js'
import ListingPic from '../listingPic/listingPic.js'

/**

@ Alec

@ 2/27/18

Purpose: Spacing and style for a listing in the grid

**/

export class Listing extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div class='listing'>
        <ListingPic />
        <ListingContent />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Listing;
