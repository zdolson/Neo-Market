import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './listing.scss'


import ListingContent from './listingContent/listingContent.js'
import { pullingDatabaseImage } from '../../fireBaseFunctions.js'

import * as firebase from 'firebase'

/**

@ Alec

@ 2/27/18

Purpose: Spacing and style for a listing in the grid

TODO: Add props logic so parent component can determine content of the listing

**/

export class Listing extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidUpdate = () => {
    let {last, search, resetSearch} = this.props;
    if(last && search) resetSearch();
  }

  render () {

    let {item} = this.props;

    var img = (
      <img src={item.imageRef} alt='loading...' height="200"/>
    );

    return (
      <div className='listing'>
        <div className='listingPic'>
          {img}
        </div>
        <ListingContent item={item} />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Listing;
