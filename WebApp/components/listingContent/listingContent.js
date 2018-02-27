import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listingContent.scss'

import ListingContentText from '../listingContentText/listingContentText.js'
import ListingContentButton from '../listingContentButton/listingContentButton.js'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for content of a listing

**/

class ListingContent extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div class='listingContent'>
        <ListingContentText />
        <ListingContentButton />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingContent
