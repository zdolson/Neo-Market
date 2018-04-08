import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './checkOutPagePicture.scss'

import Galaxy from '../../../../assets/galaxy.svg'
import Grumpy from '../../../../assets/grumpy.svg'

import { pullingDatabaseImage } from '../fireBaseFunctions.js'

import * as firebase from 'firebase'

/**

@ Nicholas

@ 03/08/18

Purpose: Picture component for the checkout page

**/

class CheckOutPagePictures extends Component {
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
      <div className='checkOutPagePicture'>
        {img}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPagePictures
