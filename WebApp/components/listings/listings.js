import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listings.scss'
import Listing from '../listing/listing.js'

/**

@ Alec

@ 2/27/18

@ Purpose: Container providing dynamic spacing and sizing of the listings grid

**/

export class Listings extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div class='listings'>
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Listings;
