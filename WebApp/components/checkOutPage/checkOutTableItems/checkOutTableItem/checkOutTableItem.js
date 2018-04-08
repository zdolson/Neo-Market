import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './checkOutTableItem.scss'

import CheckOutPagePicture from './checkOutPagePicture/checkOutPagePicture.js'
import CheckOutPageItemContent from './checkOutPageItemContent/checkOutPageItemContent.js'

import ItemX from '../../../assets/ItemX.svg'

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
    var currCheckOutItem = this.props.currCheckOutItem
    var removeCartItem = this.props.removeCartItem
    return (
      <div className='checkOutTableItem'>
        <div className="itemWrapper">
          <CheckOutPagePicture />
          <div className="itemSeperator"></div>
          <CheckOutPageItemContent currCheckOutItem={currCheckOutItem}/>
          <div className="itemX" onClick={() => {removeCartItem(currCheckOutItem['id'])}}> <ItemX/> </div>
          <Stylesheet sheet={sheet} />
        </div>
      </div>
    )
  }
}

export default CheckOutTableItem
