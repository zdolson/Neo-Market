import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listingPic.scss'

import Galaxy from '../assets/galaxy.svg'
import Grumpy from '../assets/grumpy.svg'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for picture of a listing

TODO: props logic so parent Listing can dynamically assign picture

**/

class ListingPic extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
    console.log(props);
  }

  render () {
    return (
      <div className='listingPic'>
        <Galaxy className="galaxy"/>
        <Grumpy className="grumpy"/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingPic
