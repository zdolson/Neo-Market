import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './moreInfoListingItem.scss'

import MoreInfoListingImg from './moreInfoListingImg/moreInfoListingImg.js'
import MoreInfoListingDesc from './moreInfoListingDesc/moreInfoListingDesc.js'

/**

@ Alec

@ 3/09/18

Purpose: description of moreInfoPage item

**/

class MoreInfoListingItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {

    var item = this.props.item
    var addCartItem = this.props.addCartItem

    return (
      <div className='moreInfoListingItem'>
        <MoreInfoListingImg imgRef={item.imageRef} />
        <MoreInfoListingDesc listingDescription={item.description}/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingItem
