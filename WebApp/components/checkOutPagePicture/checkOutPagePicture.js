import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './checkOutPagePicture.scss'

import Galaxy from '../assets/galaxy.svg'
import Grumpy from '../assets/grumpy.svg'

/**

@ Nicholas

@ 03/08/18

Purpose: Picture component for the checkout page

**/

class CheckOutPagePictures extends Component {
  constructor(props, context) {
    console.log("CheckoutPagePictres component was created.")
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='checkOutPagePicture'>
        <Galaxy className="galaxy"/>
        <Grumpy className="grumpy"/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPagePictures
