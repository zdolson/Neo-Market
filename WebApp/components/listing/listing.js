import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listing.scss'
import ListingContent from '../listingContent/listingContent.js'
import ListingPic from '../listingPic/listingPic.js'

/**

@ Alec

@ 2/27/18

Purpose: Spacing and style for a listing in the grid

TODO: Add props logic so parent component can determine content of the listing

**/

export class Listing extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
    console.log(props)
    console.log(this.props.item)
  }

  render () {
    var item = this.props.item;
    var tryAgain = this.props.tryAgain;
    return (
      <div className='listing'>
        <ListingPic id={item.id} tryAgain={tryAgain}/>
        <ListingContent item={item} />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Listing;
