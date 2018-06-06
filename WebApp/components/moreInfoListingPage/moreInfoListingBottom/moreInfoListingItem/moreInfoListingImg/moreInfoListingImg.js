import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './moreInfoListingImg.scss'

import * as firebase from 'firebase'

/**

@ Alec

@ 3/09/18

Purpose: img that for moreInfoPage

**/

class MoreInfoListingImg extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render () {
    var img = (
      <img src={this.props.imgRef} alt='loading...' width="350"/> 
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
