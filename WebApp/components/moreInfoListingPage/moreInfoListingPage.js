import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './moreInfoListingPage.scss'
// import MoreInfoListingFields from '../moreInfoListingFields/moreInfoListingFields.js'
import MoreInfoListingLeft from '../moreInfoListingLeft/moreInfoListingLeft.js'
import MoreInfoListingRight from '../moreInfoListingRight/moreInfoListingRight.js'

/**

@ Victoria

@ 3/08/18

Purpose: Reusable component for text withing a ListingContent

TODO: props logic so parent ListingContent can dynamically assign text

**/

class MoreInfoListingPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='moreInfoListingPage'>
        <MoreInfoListingLeft />
        <MoreInfoListingRight />
      </div>
    )
  }
}

export default MoreInfoListingPage
