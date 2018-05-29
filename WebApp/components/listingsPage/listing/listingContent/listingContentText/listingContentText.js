import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './listingContentText.scss'

import ItemSpecsLine from '../../../../assets/ItemSpecsLine.svg';

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for text withing a ListingContent

TODO: props logic so parent ListingContent can dynamically assign text

**/

class ListingContentText extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    var title = this.props.title;
    var description = this.props.description;
    return (
      <div className='listingContentText'>
        <div className="listingContentTitle">
          {title}
        </div>
        <ItemSpecsLine />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingContentText
