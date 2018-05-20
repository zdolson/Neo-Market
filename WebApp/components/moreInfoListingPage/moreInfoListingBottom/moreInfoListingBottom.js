import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './moreInfoListingBottom.scss'
import MoreInfoListingSpec from './moreInfoListingSpec/moreInfoListingSpec.js'
import MoreInfoListingItem from './moreInfoListingItem/moreInfoListingItem.js'

/**

@ Alec

@ 3/09/18

Purpose: Component for spacing of bottom of moreInfoListingPage

**/

class MoreInfoListingBottom extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    let item = this.props.item;
    let addCartItem = this.props.addCartItem;
    let removeItem = this.props.removeItem;
    let neoPrice = this.props.neoPrice;
    let useFirebaseBackend = this.props.useFirebaseBackend;
    let removeMyListing = this.props.removeMyListing;

    return (
      <div className='moreInfoListingBottom'>
        <MoreInfoListingItem item={item} />
        <MoreInfoListingSpec neoPrice={neoPrice} item={item} addCartItem={addCartItem} removeItem={removeItem} useFirebaseBackend={useFirebaseBackend} removeMyListing={removeMyListing}/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingBottom
