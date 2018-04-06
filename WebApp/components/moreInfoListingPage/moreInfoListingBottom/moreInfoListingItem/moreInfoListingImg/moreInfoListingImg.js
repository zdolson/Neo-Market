import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './moreInfoListingImg.scss'

import { pullingDatabaseImage } from '../../../../fireBaseFunctions.js'

import * as firebase from 'firebase'

/**

@ Alec

@ 3/09/18

Purpose: img that for moreInfoPage

**/

class MoreInfoListingImg extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: '',
      imgLoad: false
    }
  }

  componentWillMount() {
    var that = this
    pullingDatabaseImage(this.props.id, this.state.imgUrl, this.state.imgLoad, this.props.tryAgain, that)
  }

  render () {
    var img = (
      this.state.imgLoad ?
      <img src={this.state.imgUrl} alt='loading...' width="350"/> :
      <div className="imgLoading"> <div>loading...</div> </div>
    );
    return (
      <div className='moreInfoListingImg'>
        {img}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingImg
