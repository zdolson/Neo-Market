import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './checkOutTableItem.scss'

import CheckOutPagePicture from '../checkOutPagePicture/checkOutPagePicture.js'
import CheckOutPageItemContent from '../checkOutPageItemContent/checkOutPageItemContent.js'

import ItemX from '../assets/ItemX.svg'

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
        <div className="itemWrapper">
          <CheckOutPagePicture />
          <div className="itemSeperator"></div>
          <CheckOutPageItemContent />
          <div className="itemX"> <ItemX/> </div>
          <Stylesheet sheet={sheet} />
        </div>
      </div>
    )
  }
}

export default CheckOutTableItem
