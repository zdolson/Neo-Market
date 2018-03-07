import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './checkOutTableItem.scss'

import CheckOutPagePicture from '../checkOutPagePicture/checkOutPagePicture.js'
import CheckOutPageItemContent from '../checkOutPageItemContent/checkOutPageItemContent.js'

/**

@ Victoria/Nicholas

@ 3/4/18

Purpose: Component for creating each box-item in the checkout page

**/

class CheckOutTableItem extends Component {
  constructor(props, context) {
    console.log('checkOutTableItem was created')
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='checkOutTableItem'>
        <CheckOutPagePicture />
        <CheckOutPageItemContent />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutTableItem
