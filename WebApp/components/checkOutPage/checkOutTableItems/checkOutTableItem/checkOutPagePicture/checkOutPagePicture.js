import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './checkOutPagePicture.scss'

import { pullingDatabaseImage } from '../../../../fireBaseFunctions.js'

import * as firebase from 'firebase'

/**

@ Nicholas

@ 03/08/18

Purpose: Picture component for the checkout page

**/

class CheckOutPagePictures extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render () {
    return (
      <div className='checkOutPagePicture'>
        <img src={this.props.imgRef} alt='loading...' width="175"/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPagePictures
