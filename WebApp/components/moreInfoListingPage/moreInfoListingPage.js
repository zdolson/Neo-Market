import React, { Component } from 'react'

import { Stylesheet } from '../stylesheet.js'
import sheet from './moreInfoListingPage.scss'
// import MoreInfoListingFields from '../moreInfoListingFields/moreInfoListingFields.js'
import MoreInfoListingTop from './moreInfoListingTop/moreInfoListingTop.js'
import MoreInfoListingBottom from './moreInfoListingBottom/moreInfoListingBottom.js'

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
    let item = this.props.item;
    let addCartItem = this.props.addCartItem;
    let removeItem = this.props.removeItem;
    console.log(this.props);
    return (
      <div className='moreInfoListingPage'>
        <MoreInfoListingTop />
        <MoreInfoListingBottom item={item} addCartItem={addCartItem} removeItem={removeItem}/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingPage
