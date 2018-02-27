import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listingContentText.scss'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for text withing a ListingContent

**/

class ListingContentText extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div class='listingContentText'>
        Listing Description goes here
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingContentText
