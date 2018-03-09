import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './moreInfoListingRight.scss'

/**

@ Alec

@ 3/09/18

Purpose: Component for spacing of left side of moreInfoListingPage

TODO: props logic so parent ListingContent can dynamically assign text

**/

class MoreInfoListingRight extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='moreInfoListingRight'>
        swag
      </div>
    )
  }
}

export default MoreInfoListingRight
