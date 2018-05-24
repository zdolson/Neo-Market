import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './listingContent.scss'

import ListingContentText from './listingContentText/listingContentText.js'
import ListingContentButton from './listingContentButton/listingContentButton.js'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for content of a listing

TODO: add props logic so parent Listing can dynamically assign text

**/

class ListingContent extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    var item = this.props.item;
    var price = item.price;
    var title = item.title;
    var description = item.desc;
    console.log(description);
    return (
      <div className='listingContent'>
        <ListingContentText title={title} description={description}/>
        <ListingContentButton price={price}/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingContent
