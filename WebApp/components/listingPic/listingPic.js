import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listingPic.scss'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for picture of a listing

**/

class ListingPic extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div class='listingPic'>
        Pic goes here
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingPic
