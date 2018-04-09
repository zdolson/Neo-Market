import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './listingPic.scss'

import { pullingDatabaseImage } from '../../../fireBaseFunctions.js'

import * as firebase from 'firebase'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for picture of a listing

TODO: props logic so parent Listing can dynamically assign picture

**/

class ListingPic extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: 'defaultURL',
      imgLoad: false
    }
  }

  componentWillMount() {
    var that = this
    pullingDatabaseImage(this.props.id, this.state.imgUrl, this.state.imgLoad, this.props.tryAgain, that)
  }


  render () {
    var that = this
    pullingDatabaseImage(this.props.id, this.state.imgUrl, this.state.imgLoad, this.props.tryAgain, that)


    var img = (
      this.state.imgLoad ?
      <img src={this.state.imgUrl} alt='loading...' width="350"/> :
      <div className="imgLoading"> <div>loading...</div> </div>
    );
    return (
      <div className='listingPic'>
        {img}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingPic
