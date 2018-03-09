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
  }

  // {this.props.test_data.map(function(object) {
  //   return (
  //     <h1> key={this.props.test_data.id} data={this.props.test_data} </h1>
  //   )
  // })}
  
  render () {
    return (
      <div className='listing'>
        <ListingPic />
        <ListingContent />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Listing;
